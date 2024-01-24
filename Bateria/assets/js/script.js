const $ = name => document.querySelector(name);

const container = $(".container");
const keys = $(".keys").childNodes;
const sounds = $(".sounds").childNodes;
const keyMap = ["KeyQ", "KeyW", "KeyE", "KeyA", "KeyS", "KeyD", "KeyZ", "KeyX", "KeyC"]


keys.forEach((v, i) => {
    v.addEventListener("click", async () => {
        await playAudio(i);
        keys[i].classList.toggle("button-active");
    });
});


$("body").addEventListener("keydown", async (key) => {
    if (keyMap.includes(key.code) && "input-field" !== document.activeElement.id) {
        let index = keyMap.indexOf(key.code) * 2 + 1;
        await playAudio(index);
        keys[index].classList.toggle("button-active");
    }
});


$("#play-button").addEventListener("click", async () => {
    let text = $("#input-field").value.replace(" ", "");

    for (char of text) {
        let keyCode = `Key${char.toUpperCase()}`;
        if (keyMap.includes(keyCode)){    
            let index = keyMap.indexOf(keyCode) * 2 + 1;
            await playAudio(index);
            keys[index].classList.toggle("button-active");
        }
    }
});

function playAudio(index){
    return new Promise(res=>{
        keys[index].classList.toggle("button-active");
        sounds[index].play();
        sounds[index].onended = res
    })
}
