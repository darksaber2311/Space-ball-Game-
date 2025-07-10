canvas = document.querySelector('canvas')
c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreElement')
const startBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')
const bigScoreEl = document.querySelector('#bigScoreEl')


let score = 0
let mouseX
let mouseY

const colors = ['yellow',
                'blue',
                'green',
                'purple']

class Player // the white dot in the centre its static not gonna move anywhere just gonna shoot enemies
{
  constructor()
  {
    this.position = {x:innerWidth/2,y:innerHeight/2}
    this.radius = 20
    this.color = 'white'
  }
  draw()
  {
    c.beginPath()
    c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
    c.fillStyle = this.color
    c.fill()
  }
  update()
  {
    this.draw()
    for(let i=0;i<enemies.length;i++)
    {
      let dist = getDistance(enemies[i].position,this.position)
      const overlap = enemies[i].radius+this.radius- dist
      if(overlap>0)
      {
        onHitPlayer(enemies[i],this)
        console.log('hit')
      }
    }

  }
}
class Enemy // these are colorful and of different sizes moving towards the centre(player) to attack
{
  constructor(position,radius,color)
  {
    this.position = position
    this.radius = radius
    this.color = color
    this.velocity = {x:0,y:0}
  }
  draw()
  {
    c.beginPath()
    c.fillStyle = this.color
    c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
    c.fill()
  }
 followPlayer(playerPos)
{
  this.velocity.x = -(this.position.x-playerPos.x)/getDistance({x:this.position.x,y:this.position.y},playerPos)
  this.velocity.y = -(this.position.y-playerPos.y)/getDistance({x:this.position.x,y:this.position.y},playerPos)
 }
  update()
  {
    this.followPlayer(player.position)
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y

    this.draw()
    for(let i=0;i<projectiles.length;i++)
    {
      let dist = getDistance(projectiles[i].position,this.position)
      const overlap = projectiles[i].radius+this.radius- dist
      if(overlap>0) // if any projectile touch(or colide) the enemy
      {
        onHitProjectile(projectiles[i],this)
      }
    }

  }
}
class Projectile // this is what the player will shoot towards enemies
{
  constructor(velocity)
  {
    this.position = {x:innerWidth/2,y:innerHeight/2}
    this.velocity = velocity
    this.radius = 5
  }
  draw()
  {
    c.beginPath()
    c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
    c.fillStyle = 'red'
    c.fill()
  }
  update()
  {

    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
    this.draw()

  }
}

class Particles // small particles to create an explosion effect when enemies are hit
{
  constructor(position,color,velocity)
  {
    this.alpha = 1 // this is the transparency of particles
    this.radius = 2;
    this.position = position
    this.color = color
    this.velocity = velocity
  }
  draw()
  {
    c.save()
    c.globalAlpha = this.alpha
     c.beginPath()
     c.fillStyle = this.color;
     c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
     c.fill()
     c.restore()
  }
  update()
  {
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
    this.alpha-=0.01
  }
}

let player
let projectiles
let enemies
let particles

function init()
{
  score=0
  scoreEl.innerHTML = score
  bigScoreEl.innerHTML = score
  player = new Player()
  projectiles = []
  enemies = []
  particles =[]
}

function spawnEnemies() // spawnEnemies outside the canvas
{
setInterval(()=>{
  const radius = randomInRange(5,35)
  const angle = randomInRange(0,Math.PI*2)
  const dist = randomInRange(100,500)
  let posX,posY

  if(Math.random()<0.5)
  {
    posX = Math.random()<0.5? 0-radius:innerWidth+radius
    posY = Math.random()*innerHeight
  }
  else {
    posX = Math.random()*innerHeight
    posY = Math.random()<0.5? 0-radius:innerHeight+radius
  }

  const col = colors[Math.floor(Math.random()*colors.length)]
  //const velX = -(posX-player.position.x)/getDistance({x:posX,y:posY},player.position)
  //const velY = -(posY-player.position.y)/getDistance({x:posX,y:posY},player.position)
  console.log('whaa')
  enemies.push(new Enemy({x:posX,y:posY},radius,col))
},1000)
}

let animationId
function animate()
{
  animationId = requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.3)'
  c.fillRect(0,0,canvas.width,canvas.height)

  player.update()

for(let i=0;i<projectiles.length;i++)
{
  projectiles[i].update()
}

enemies.forEach((enemy) => {
  enemy.update()
});

particles.forEach((particle,index) => {
  particle.update()
  if(particle.alpha<=0)
  {
    particles.splice(index,1) // destroy particles after alpha value is below zero
  }
});

}


function getDistance(coordinate,otherCoordinate) // gives distance between two objects
{
  let diffX = otherCoordinate.x - coordinate.x
  let diffY = otherCoordinate.y - coordinate.y
  let dist = Math.pow(Math.pow(diffX,2)+Math.pow(diffY,2),0.5)
  return dist
}

function onHitProjectile(object,otherObject) // when an Otherobject(enemy) hits object(projectile)
{
  let index = projectiles.indexOf(object)
  projectiles.splice(index,1)
  otherObject.radius-=4;
  for(let i=0;i<8;i++)
  {
    const particleVelocity = {x:5*(Math.random()-0.5),y:5*(Math.random()-0.5)}
    particles.push(new Particles({x:otherObject.position.x,y:otherObject.position.y},otherObject.color,particleVelocity))
    //console.log('hello')
  }
  if(otherObject.radius<3)
  {
    let index1 = enemies.indexOf(otherObject)
    enemies.splice(index1,1)
    score+=100
    scoreEl.innerHTML = score
  }

}

function onHitPlayer(object,otherObject) // when an object(enemy) hits ohterObject(player)
{
  let index = enemies.indexOf(object)
  enemies.splice(index,1)
  otherObject.radius-=5;
  for(let i=0;i<8;i++)
  {
    const particleVelocity = {x:5*(Math.random()-0.5),y:5*(Math.random()-0.5)}
    particles.push(new Particles({x:otherObject.position.x,y:otherObject.position.y},otherObject.color,particleVelocity))
    //console.log('hello')
  }
  if(otherObject.radius<10)  // gameOver Condition and showing the restart Btn
  {
  modalEl.style.display = 'flex'
  bigScoreEl.innerHTML = score
  cancelAnimationFrame(animationId)
//  console.log('game Over')
  }
}

function randomInRange(lowerBound,upperBound)
{
  return (lowerBound+Math.random()*(upperBound-lowerBound))
}

function stopGame() {
  cancelAnimationFrame(animationId)
}


addEventListener('click',(event)=>{
  mouseX = event.x
  mouseY = event.y
  const angle = Math.atan2(event.clientY-canvas.height/2,event.clientX - canvas.width/2)
  let vel = {x:Math.cos(angle)*8,y:Math.sin(angle)*8}
  projectiles.push(new Projectile(vel)) // genrates projectile and throws it in direction based on mouse click
  console.log(angle)
})

startBtn.addEventListener('click',(event)=>{  // displays the startBtn
  stopGame()
  init()
  spawnEnemies()
  animate()

  modalEl.style.display = 'none'
})


// Problems to address on later projects
// 1. setInterval keeps calling every one second even if the frame is cancelled(or paused) , dont want that gotta figure that out
// 2. Want to implement a high score system , which stores the personal best and compares with current score
