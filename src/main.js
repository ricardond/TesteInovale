// Importação dos módulos necessários da biblioteca THREE.js e de um arquivo de configuração
import * as THREE from 'three'; // Importa toda a biblioteca THREE.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importa os controles para mover a câmera com o mouse
import { saveSettings, loadSettings } from './config.js'; // Importa as funções para salvar e carregar configurações personalizadas

// Criação da cena, câmera e renderizador
const scene = new THREE.Scene(); // Cria a cena onde os objetos serão renderizados
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize(window.innerWidth, window.innerHeight); 
renderer.setAnimationLoop(animate); 
document.body.appendChild(renderer.domElement); 

// Criação e configuração das luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiente de cor branca e intensidade 0.5
scene.add(ambientLight); // Adiciona a luz ambiente à cena

let light = new THREE.DirectionalLight(0xffffff, 1); // Luz direcional de cor branca e intensidade 1
light.position.set(5, 5, 5); 
scene.add(light); 

// Criação de um cubo com geometria e material padrão
const geometry = new THREE.BoxGeometry(1, 1, 1); 
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); 
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube); // Adiciona o cubo à cena

// Configura a posição inicial da câmera
camera.position.z = 5; 

// Criação e configuração dos controles de órbita para a câmera
const controls = new OrbitControls(camera, renderer.domElement); 

// Armazena os estados das teclas pressionadas
const keys = {}; 

// Adiciona eventos de escuta para capturar teclas pressionadas e soltas
document.addEventListener('keydown', (event) => {
    keys[event.code] = true; // Marca a tecla pressionada como 'true'
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false; // Marca a tecla solta como 'false'
});

// Configuração dos controles de interface (HTML) para personalizar as propriedades do cubo e da cena
const colorPicker = document.getElementById('colorPicker'); 
const lightIntensity = document.getElementById('lightIntensity'); 
const bgColor = document.getElementById('bgColor'); 
const posX = document.getElementById('posX'); 
const posY = document.getElementById('posY'); 
const posZ = document.getElementById('posZ'); 

// Adiciona eventos de escuta para os controles de interface
colorPicker.addEventListener('input', () => {
    material.color.set(colorPicker.value); // Atualiza a cor do cubo com o valor selecionado
    saveSettings({ color: material.color.getHexString() }); // Salva a cor do cubo nas configurações
});

lightIntensity.addEventListener('input', () => {
    light.intensity = parseFloat(lightIntensity.value); 
    saveSettings({ lightIntensity: light.intensity }); 
});

bgColor.addEventListener('input', () => {
    const gray = parseInt(bgColor.value); // Converte o valor de cor de fundo para um valor inteiro
    scene.background = new THREE.Color(`rgb(${gray}, ${gray}, ${gray})`); // Atualiza a cor de fundo da cena
    saveSettings({ backgroundColor: bgColor.value }); // Salva a cor de fundo nas configurações
});

posX.addEventListener('input', () => {
    cube.position.x = parseFloat(posX.value); // Atualiza a posição X do cubo com o valor selecionado
    saveSettings({ position: { x: cube.position.x, y: cube.position.y, z: cube.position.z } }); // Salva a posição do cubo nas configurações
});

posY.addEventListener('input', () => {
    cube.position.y = parseFloat(posY.value); // Atualiza a posição Y do cubo com o valor selecionado
    saveSettings({ position: { x: cube.position.x, y: cube.position.y, z: cube.position.z } }); 
});

posZ.addEventListener('input', () => {
    cube.position.z = parseFloat(posZ.value); // Atualiza a posição Z do cubo com o valor selecionado
    saveSettings({ position: { x: cube.position.x, y: cube.position.y, z: cube.position.z } }); // Salva a posição do cubo nas configurações
});

// Carrega as configurações salvas anteriormente
loadSettings().then(settings => {
    if (settings) { // Verifica se existem configurações salvas
        material.color.set(`#${settings.color}`); // Aplica a cor salva ao cubo
        light.intensity = settings.lightIntensity; // Aplica a intensidade da luz salva
        scene.background = new THREE.Color(`rgb(${settings.backgroundColor}, ${settings.backgroundColor}, ${settings.backgroundColor})`); // Aplica a cor de fundo salva
        cube.position.set(settings.position.x || 0, settings.position.y || 0, settings.position.z || 0); // Aplica a posição salva ao cubo
    }
});

// Função de animação chamada repetidamente para atualizar a cena
function animate() {
    // Controle de movimento da câmera com as teclas W, S, A, D, Q, E
    if (keys['KeyW']) camera.position.z -= 0.1; // Move a câmera para frente
    if (keys['KeyS']) camera.position.z += 0.1; // Move a câmera para trás
    if (keys['KeyA']) camera.position.x -= 0.1; // Move a câmera para a esquerda
    if (keys['KeyD']) camera.position.x += 0.1; // Move a câmera para a direita
    if (keys['KeyQ']) camera.position.y += 0.1; // Move a câmera para cima
    if (keys['KeyE']) camera.position.y -= 0.1; // Move a câmera para baixo

    controls.update(); 
    renderer.render(scene, camera); 
}
