const synth=window.speechSynthesis;

//DOM elements

const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const body = document.querySelector('body');


//Init voices array
let voices=[];
const getVoices=()=>{
    voices=synth.getVoices();
    
    voices.forEach(voice=>{
        const option=document.createElement('option');

        option.textContent=voice.name+'('+voice.lang+')';
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });

};

        if(synth.onvoiceschanged!==undefined){
            synth.onvoiceschanged=getVoices;
        }


const speak =()=>{
    if(synth.speaking){
        console.error('Already Speaking...');
        return;
    }
    if(textInput.value !==''){
        body.style.background = 'url(img/giphy.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100%';
        const temp =document.getElementById("demo");
        temp.innerHTML="Speaking..";
        const speakText=new SpeechSynthesisUtterance(textInput.value);
        speakText.onend=e=>{
            console.log('Done speaking..');
            body.style.background = '#141414';
            temp.innerHTML=" ";
        }
        speakText.onerror=e=>{
            console.error('Something went Wrong');
        }

        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice;
            }
        });
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;
        synth.speak(speakText);
        

    }

};

textForm.addEventListener('submit',e=>{
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener('change',e=>(rateValue.textContent=rate.value));
pitch.addEventListener('change',e=>(pitchValue.textContent=pitch.value));
voiceSelect.addEventListener('change',e=>speak());

