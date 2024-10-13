namespace SpriteKind {
    export const None = SpriteKind.create()
}
function Game () {
    Lists()
    Dimension = 0
    LoopNum = 1
    Menu = false
    mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
    controller.moveSprite(mySprite, MoveX[Dimension], MoveY[Dimension])
    mySprite.ay = GravityY[Dimension]
    mySprite.ax = GravityX[Dimension]
    scene.setBackgroundImage(assets.image`myImage2`)
    tiles.setCurrentTilemap(tilemap`level`)
    scene.cameraFollowSprite(mySprite)
}
function Lists () {
    GravityY = [200, -200, 0]
    GravityX = [0, 0, 200]
    MoveX = [75, 100, 0]
    MoveY = [0, 0, 75]
    JumpY = [-125, 125, 0]
    JumpX = [0, 0, -125]
    PlayerImg = [assets.image`myImage`, assets.image`myImage0`, assets.image`myImage1`]
    Col1 = ["#FEECD2", "D5FFFF", "#e5c8f7"]
    Col2 = ["5258AD", "ad5252", "#fcba03"]
    Col3 = ["494E97", "974949", "#e3ad19"]
    Col4 = ["444883", "864444", "#c4981d"]
    Col5 = ["2C2F58", "5B2C2C", "#9c791a"]
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Menu == true) {
        if (MenuCount == 1) {
            sprites.destroyAllSpritesOfKind(SpriteKind.None)
            Game()
        } else if (MenuCount == 2) {
            game.setDialogTextColor(1)
            game.setDialogCursor(img`
                . . . . 5 5 5 5 5 5 5 . . . . 
                . . 5 5 3 3 3 3 3 3 3 5 5 . . 
                . 5 5 3 3 3 4 4 4 3 3 3 5 5 . 
                . 5 3 3 3 4 4 3 4 4 3 3 3 5 . 
                . 5 3 3 4 4 4 4 4 4 4 3 3 5 . 
                . 5 2 3 4 3 3 3 3 3 4 3 2 5 . 
                . 5 2 2 3 3 3 3 3 3 3 2 2 5 . 
                . 5 4 4 2 2 2 2 2 2 2 4 4 5 . 
                5 5 4 4 4 4 4 4 4 4 4 4 4 5 5 
                5 2 5 5 4 4 4 4 4 4 4 5 5 2 5 
                5 2 2 2 5 5 5 5 5 5 5 2 2 2 5 
                5 5 3 2 2 2 2 2 2 2 2 2 3 5 5 
                5 5 5 5 5 3 3 3 3 3 5 5 5 5 5 
                5 5 3 3 3 3 3 3 3 3 3 3 3 5 5 
                . 5 5 3 3 3 3 3 3 3 3 3 5 5 . 
                . . . 5 5 5 5 5 5 5 5 5 . . . 
                `)
            game.setDialogFrame(assets.image`myImage8`)
            game.showLongText("HOW TO PLAY-  WASD for movement, Space/A to jump, and Enter/B to switch dimensions.", DialogLayout.Full)
        }
    } else {
        mySprite.vy = JumpY[Dimension]
        mySprite.vx = JumpX[Dimension]
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Menu == false) {
        Dimension += 1
        if (Dimension > Col2.length - LoopNum) {
            Dimension = 0
        }
        color.setColor(1, color.parseColorString(Col1[Dimension]))
        color.setColor(2, color.parseColorString(Col2[Dimension]))
        color.setColor(3, color.parseColorString(Col3[Dimension]))
        color.setColor(4, color.parseColorString(Col4[Dimension]))
        color.setColor(5, color.parseColorString(Col5[Dimension]))
        mySprite.setImage(PlayerImg[Dimension])
        mySprite.ay = GravityY[Dimension]
        mySprite.ax = GravityX[Dimension]
        controller.moveSprite(mySprite, MoveX[Dimension], MoveY[Dimension])
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Menu == true) {
        MenuCount += 1
        if (MenuCount == 3) {
            MenuCount = 1
        }
    }
})
let MenuCount = 0
let Col5: string[] = []
let Col4: string[] = []
let Col3: string[] = []
let Col2: string[] = []
let Col1: string[] = []
let PlayerImg: Image[] = []
let JumpX: number[] = []
let JumpY: number[] = []
let GravityX: number[] = []
let GravityY: number[] = []
let MoveY: number[] = []
let MoveX: number[] = []
let mySprite: Sprite = null
let LoopNum = 0
let Dimension = 0
let Menu = false
Menu = true
let Title = sprites.create(assets.image`myImage3`, SpriteKind.None)
Title.changeScale(1, ScaleAnchor.Middle)
Title.setPosition(80, 20)
scene.setBackgroundColor(5)
let Play = sprites.create(assets.image`myImage4`, SpriteKind.None)
Play.setPosition(80, 60)
let Info = sprites.create(assets.image`myImage6`, SpriteKind.None)
Info.setPosition(80, 75)
game.onUpdate(function () {
    if (MenuCount == 1) {
        Play.setImage(assets.image`myImage5`)
        Info.setImage(assets.image`myImage6`)
    } else if (MenuCount == 2) {
        Play.setImage(assets.image`myImage4`)
        Info.setImage(assets.image`myImage7`)
    }
})
// Phasethrough BLocks
game.onUpdate(function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        if (Dimension == 1) {
            tiles.setTileAt(value, assets.tile`myTile3`)
            tiles.setWallAt(value, false)
        } else {
            tiles.setTileAt(value, assets.tile`myTile2`)
            tiles.setWallAt(value, true)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        if (Dimension != 1) {
            tiles.setTileAt(value, assets.tile`myTile2`)
            tiles.setWallAt(value, true)
        } else {
            tiles.setTileAt(value, assets.tile`myTile3`)
            tiles.setWallAt(value, false)
        }
    }
})
