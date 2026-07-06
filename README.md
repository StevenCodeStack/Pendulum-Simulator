# Pendulum Simulator

a simple pendulum simulator i made for a school project. it uses the real pendulum equation, not the approximation one from high school (sin theta = theta).

## what is this

this website lets you create multiple pendulums and change their length, gravity, and starting angle. it shows how they swing in real time. you can pause and reset them too.

## physics

most high school physics uses the small angle approximation:

    θ'' = -(g/L) * θ

this only works for small angles. i used the real one:

    θ'' = -(g/L) * sin(θ)

this means the pendulum works for any angle, even close to 180 degrees.

## important

this is a rigid rod pendulum, not a rope. the rod doesnt bend or go slack. it stays straight at all angles.

## how to use

- pendulums show up on the canvas
- use the sidebar to add or remove pendulums
- change length, gravity, angle with sliders or number inputs
- pause button freezes everything
- reset button sends all pendulums back to starting angle

## what i used

- next.js
- react
- typescript
- canvas HTML 5 (for drawing)
- tailwind css (for styling)

## limitations

- this only works on pc. mobile layout is broken, not supported.
- no damping yet. pendulums swing forever (will be a new feature, not soon though).
- no driving force, just gravity.

## future stuff maybe

- info bar that shows speed and acceleration
- damping slider
- export data as csv

## how to run

clone the repo and run these commands:

npm install
npm run dev

open localhost:3000 in your browser.

## note

this was made for a high school physics project. i am not a professional programmer. if something breaks, just refresh the page :).
