/* ========================================
   GERADOR DE SENSI - JAVASCRIPT
   ======================================== */

// Estado da aplicação
let state = {
  sensiType: 'normal',
  quantity: 1,
  showPassword: false
};

/* ========================================
   FUNÇÕES PRINCIPAIS
   ======================================== */

/**
 * Alterna entre Sensi Normal e Premium
 * @param {string} type - 'normal' ou 'premium'
 */
function setSensiType(type) {
  state.sensiType = type;
  
  const btnNormal = document.getElementById('btn-normal');
  const btnPremium = document.getElementById('btn-premium');
  
  if (type === 'normal') {
    btnNormal.classList.add('tab-active');
    btnPremium.classList.remove('tab-active');
  } else {
    btnNormal.classList.remove('tab-active');
    btnPremium.classList.add('tab-active');
  }
  
  // Animação de feedback
  const activeBtn = type === 'normal' ? btnNormal : btnPremium;
  activeBtn.classList.add('scale-in');
  setTimeout(() => activeBtn.classList.remove('scale-in'), 200);
}

/**
 * Altera a quantidade de sensis
 * @param {number} delta - Valor a adicionar (1 ou -1)
 */
function changeQuantity(delta) {
  const newQuantity = state.quantity + delta;
  
  if (newQuantity >= 1 && newQuantity <= 10) {
    state.quantity = newQuantity;
    const display = document.getElementById('quantity');
    display.textContent = newQuantity;
    
    // Animação de feedback
    display.classList.add('scale-in');
    setTimeout(() => display.classList.remove('scale-in'), 200);
  }
}

/**
 * Alterna visibilidade da senha
 */
function togglePassword() {
  state.showPassword = !state.showPassword;
  
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');
  
  if (state.showPassword) {
    passwordInput.type = 'text';
    eyeIcon.style.display = 'none';
    eyeOffIcon.style.display = 'block';
  } else {
    passwordInput.type = 'password';
    eyeIcon.style.display = 'block';
    eyeOffIcon.style.display = 'none';
  }
}

/**
 * Gera a sensibilidade
 */
function generateSensi() {
  const phoneBrand = document.getElementById('phone-brand').value;
  const phoneModel = document.getElementById('phone-model').value;
  const password = document.getElementById('password').value;
  
  // Validação básica
  if (!phoneModel.trim()) {
    const modelInput = document.getElementById('phone-model');
    modelInput.classList.add('shake');
    modelInput.focus();
    setTimeout(() => modelInput.classList.remove('shake'), 500);
    alert('Por favor, digite o modelo do seu celular!');
    return;
  }
  
  if (!password.trim()) {
    const passwordInput = document.getElementById('password');
    passwordInput.classList.add('shake');
    passwordInput.focus();
    setTimeout(() => passwordInput.classList.remove('shake'), 500);
    alert('Por favor, digite a senha de acesso!');
    return;
  }
  
  // Dados para processar
  const data = {
    type: state.sensiType,
    brand: phoneBrand,
    model: phoneModel,
    quantity: state.quantity,
    password: password
  };
  
  console.log('Gerando sensi:', data);
  
  // Feedback visual no botão
  const btn = document.querySelector('.btn-primary');
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <svg class="spinning" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
    Gerando...
  `;
  btn.disabled = true;
  
  // Simula processamento
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    
    // Aqui você pode adicionar a lógica real de geração
    // Por exemplo, exibir um modal com os resultados
    showResults(data);
  }, 2000);
}

/**
 * Exibe os resultados (exemplo)
 * @param {object} data - Dados da geração
 */
function showResults(data) {
  // Gera sensibilidades aleatórias como exemplo
  const sensitivities = [];
  
  for (let i = 0; i < data.quantity; i++) {
    sensitivities.push({
      geral: Math.floor(Math.random() * 50) + 50,
      redDot: Math.floor(Math.random() * 50) + 50,
      scope2x: Math.floor(Math.random() * 50) + 50,
      scope4x: Math.floor(Math.random() * 40) + 30,
      sniper: Math.floor(Math.random() * 30) + 20,
      freeView: Math.floor(Math.random() * 50) + 50
    });
  }
  
  // Formata resultado
  let resultText = `🎯 SENSI ${data.type.toUpperCase()} GERADA!\n\n`;
  resultText += `📱 ${data.brand} ${data.model}\n\n`;
  
  sensitivities.forEach((sensi, index) => {
    if (data.quantity > 1) {
      resultText += `--- Config ${index + 1} ---\n`;
    }
    resultText += `Geral: ${sensi.geral}\n`;
    resultText += `Red Dot: ${sensi.redDot}\n`;
    resultText += `Mira 2x: ${sensi.scope2x}\n`;
    resultText += `Mira 4x: ${sensi.scope4x}\n`;
    resultText += `Sniper: ${sensi.sniper}\n`;
    resultText += `Botão da mira: ${sensi.freeView}\n\n`;
  });
  
  alert(resultText);
}

/* ========================================
   ESTILOS DINÂMICOS
   ======================================== */

// Adiciona estilo para spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinning {
    animation: spin 1s linear infinite;
  }
  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }
`;
document.head.appendChild(style);

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 Gerador de Sensi carregado!');
  
  // Adiciona efeito de foco nos inputs
  const inputs = document.querySelectorAll('.gaming-input, .gaming-select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement?.classList.remove('focused');
    });
  });
  
  // Permite Enter para gerar
  document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      generateSensi();
    }
  });
});