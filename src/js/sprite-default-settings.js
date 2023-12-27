const resolucao = localStorage.getItem('resolucao')

const characterDefaultSettings = {
    tanjiro: {
        idle: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 10: 20,
            scale: 3,
            offset: {
                y: 0
            }
        },
        idleInverted: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 10: 20,
            scale: 3,
            offset: {
                y: 0
            }
        },
        run: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        runInverted: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        jump: {
            framesMax: 2,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        jumpInverted: {
            framesMax: 2,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        attack: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 5: 7,
            scale: 3,
            offset: {
                y: 0
            }
        },
        attackInverted: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 5: 7,
            scale: 3,
            offset: {
                y: 0
            }
        },
        takeHit: {
            framesMax: 5,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        fall: {
            framesMax: 10,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        dash: {
            framesMax: 4,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        dashInverted: {
            framesMax: 4,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        }
    },

    zenitsu: {
        idle: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 10: 20,
            scale: 2.9,
            offset: {
                y: -5
            }
        },
        idleInverted: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 10: 20,
            scale: 2.9,
            offset: {
                y: -5
            }
        },
        run: {
            framesMax: 4,
            framesHold: resolucao==='1280x720'? 10: 10,
            scale: 2.7,
            offset: {
                y: -20
            }
        },
        runInverted: {
            framesMax: 4,
            framesHold: resolucao==='1280x720'? 10: 10,
            scale: 2.7,
            offset: {
                y: -20
            }
        },
        jump: {
            framesMax: 2,
            framesHold: 10,
            scale: 2.9,
            offset: {
                y: 10
            }
        },
        jumpInverted: {
            framesMax: 2,
            framesHold: 10,
            scale: 2.9,
            offset: {
                y: 10
            }
        },
        attack: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 4: 7,
            scale: 2.9,
            offset: {
                y: -5
            }
        },
        attackInverted: {
            framesMax: 8,
            framesHold: resolucao==='1280x720'? 4: 7,
            scale: 2.9,
            offset: {
                y: -5
            }
        },
        takeHit: {
            framesMax: 5,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 2.9,
            offset: {
                y: -5
            }
        },
        fall: {
            framesMax: 10,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        dash: {
            framesMax: 5,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        },
        dashInverted: {
            framesMax: 5,
            framesHold: resolucao==='1280x720'? 5: 10,
            scale: 3,
            offset: {
                y: 0
            }
        }
    }
}