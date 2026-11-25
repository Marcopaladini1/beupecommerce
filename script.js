(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  // Visualização responsiva real: a navegação inferior acompanha telas menores.
  const device = $('#device');
  const mobileMedia = window.matchMedia('(max-width: 768px)');
  const updateResponsiveLayout = () => device.classList.toggle('mobile', mobileMedia.matches);
  updateResponsiveLayout();
  if (mobileMedia.addEventListener) {
    mobileMedia.addEventListener('change', updateResponsiveLayout);
  
  } else {
    mobileMedia.addListener(updateResponsiveLayout);
  }

  // ==================================
  // POP-UP DE BOAS-VINDAS
  // ==================================

  const welcomePopup = $('#welcome-popup');
  const closeWelcomeButton = $('#close-welcome');
  const welcomeShopButton = $('#welcome-shop');

  const welcomeStorageKey = 'welcomePopupDismissed';

  let welcomePreviousFocus = null;

  function closeWelcomePopup() {
    if (welcomePopup.hidden) return;

    welcomePopup.hidden = true;

    document.body.style.overflow = '';

    // Não exibe novamente nesta sessão
    try {
      sessionStorage.setItem(welcomeStorageKey, '1');
    } catch (error) {
      // Continua funcionando caso o armazenamento
      // do navegador esteja indisponível.
    }

    if (welcomePreviousFocus?.focus) {
      welcomePreviousFocus.focus();
    }
  }

  // Verifica se já foi fechado nesta sessão
  let hasSeenWelcome = false;

  try {
    hasSeenWelcome =
      sessionStorage.getItem(welcomeStorageKey) === '1';
  } catch (error) {
    hasSeenWelcome = false;
  }

  
 // Exibe o pop-up após 5 segundos
 // Apenas na primeira visita da sessão
 if (!hasSeenWelcome) {
   setTimeout(() => {
     // Evita abrir se outro modal estiver ativo
     const hasOpenOverlay = [
       '#cart-drawer',
       '#video-modal',
       '#pack-flavor-modal'
     ].some(selector => {
       const element = document.querySelector(selector);
       return element && !element.hidden;
     });

     if (hasOpenOverlay) return;

     welcomePreviousFocus = document.activeElement;

     welcomePopup.hidden = false;
     document.body.style.overflow = 'hidden';

     closeWelcomeButton.focus();
   }, 5000);
 }


  // Fecha pelo X
  closeWelcomeButton.addEventListener(
    'click',
    closeWelcomePopup
  );

  // Fecha quando o visitante clica no CTA
  welcomeShopButton.addEventListener(
    'click',
    closeWelcomePopup
  );

  // Fecha ao clicar fora do card
  welcomePopup.addEventListener('click', event => {
    if (event.target === welcomePopup) {
      closeWelcomePopup();
    }
  });

  // Teclado: Esc e navegação entre os controles
  document.addEventListener('keydown', event => {
    if (welcomePopup.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeWelcomePopup();
    }

    if (event.key === 'Tab') {
      if (
        event.shiftKey &&
        document.activeElement === closeWelcomeButton
      ) {
        event.preventDefault();
        welcomeShopButton.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === welcomeShopButton
      ) {
        event.preventDefault();
        closeWelcomeButton.focus();
      }
    }
  });

  const products = {

    tasting: {
      name: 'Kit Degustação · 4 sabores', count: null, eyebrow: 'DESTAQUE · KIT DEGUSTAÇÃO',
      title: 'Primeira vez por aqui? Conheça nossos 4 sabores.',
      description: 'Gosto de suco de verdade em quatro sabores. Experimente todos e descubra seu favorito.',
      quantity: '4 sabores', composition: 'Composição a confirmar',
      caption: '[Imagem do Kit Degustação · 4 sabores]',
      footnote: 'A quantidade total de garrafas do Kit Degustação ainda será definida.', bottles: 4,
    },
    twelve: {
      name: 'Pack 12 garrafas', count: 12, eyebrow: 'PACK FECHADO · 12 GARRAFAS',
      title: 'A gente facilita sua escolha.',
      description: 'Um pack para começar sem complicar. Escolha até 2 sabores ou fique com 12 garrafas de um único favorito.',
      quantity: '12 garrafas', composition: '2 grupos de 6 · até 2 sabores',
      caption: '[Imagem ilustrativa · pack 12 garrafas]',
      footnote: 'Selecione os sabores na próxima etapa; cada grupo equivale a 6 garrafas.', bottles: 3,
    },
    eighteen: {
      name: 'Pack 18 garrafas', count: 18, eyebrow: '18 GARRAFAS · OFERTA EM DEFINIÇÃO',
      title: 'Compre mais, pague menos.',
      description: 'Mais garrafas para combinar os favoritos do seu jeito. Escolha até 3 sabores ou repita o que você mais gosta.',
      quantity: '18 garrafas', composition: '3 grupos de 6 · até 3 sabores',
      caption: '[Imagem ilustrativa · pack 18 garrafas]',
      footnote: 'Texto de economia provisório: só publicar após confirmar preço por garrafa inferior ao pack 12.', bottles: 4,
    },
    twentyfour: {
      name: 'Pack 24 garrafas', count: 24, eyebrow: 'PACK FECHADO · 24 GARRAFAS',
      title: 'Seu pack cresceu. As vantagens também.',
      description: 'São 24 garrafas para distribuir entre até 4 sabores. E, se houver uma promoção ativa, você confere os benefícios deste pack aqui.',
      quantity: '24 garrafas', composition: '4 grupos de 6 · até 4 sabores',
      caption: '[Imagem ilustrativa · pack 24 garrafas]',
      footnote: 'Brindes ou vantagens extras só serão exibidos quando estiverem definidos e disponíveis.', bottles: 5,
    },
    thirty: {
      name: 'Pack 30 garrafas', count: 30, eyebrow: 'PACK FECHADO · 30 GARRAFAS',
      title: 'Se é pra ter seus favoritos, que seja de sobra.',
      description: 'São 30 garrafas para combinar do seu jeito. Escolha até 4 sabores e repita os que mais ama.',
      quantity: '30 garrafas', composition: '5 grupos de 6 · 4 sabores disponíveis',
      caption: '[Imagem ilustrativa · pack 30 garrafas]',
      footnote: 'A caixa é formada por 5 grupos de 6 garrafas. Você pode repetir os sabores que quiser.', bottles: 5,
    },
  };
  
const productPhotos = {
  tasting: 'assets/BeUp_Kit_Degustacao_1x1(1).png',
  twelve: 'assets/BeUp_Pack_12_1x1(1).png',
  eighteen: 'assets/BeUp_Pack_18_1x1(1).png',
  twentyfour: 'assets/BeUp_Pack_24_1x1(1).png',
  thirty: 'assets/BeUp_Pack_30_1x1(1).png'
};



let currentProduct = 'tasting';

// Reorganização visual da vitrine
const featureSection = $('#product-feature');
const featureMedia = $('#pack-visual');
const packSelector = featureSection.querySelector('.pack-tabs-block');

const priceElement = $('#pack-price');
const purchaseButton = $('#add-feature-pack');

// Criamos uma área própria para preço e CTA
const featurePurchase = document.createElement('div');
featurePurchase.className = 'product-feature-purchase';

// Movemos os elementos originais, sem duplicá-los
featurePurchase.append(priceElement, purchaseButton);

// O seletor passa a ficar dentro da imagem
featureMedia.append(packSelector);

// A área de compra passa a ser uma divisão da vitrine
featureSection.append(featurePurchase);


const tabs = $$('.pack-tab');

// ==========================================
// CARROSSEL VISUAL DOS PACKS
// ==========================================

const packOrder = [
  'tasting',
  'twelve',
  'eighteen',
  'twentyfour',
  'thirty'
];

const packImageCarousel = document.createElement('div');
packImageCarousel.className = 'pack-image-carousel';
packImageCarousel.setAttribute(
  'aria-label',
  'Carrossel de produtos BeUp'
);

const packImageCards = new Map();

// Cria os cinco cards apenas uma vez
packOrder.forEach(key => {

  const card = document.createElement('button');

  card.type = 'button';
  card.className = 'pack-image-card';
  card.dataset.pack = key;
  card.tabIndex = -1;

  card.setAttribute(
    'aria-label',
    'Selecionar ' + products[key].name
  );

  const image = document.createElement('img');

  image.src = productPhotos[key];
  image.alt = products[key].name;
  image.draggable = false;
  image.loading = 'eager';

  card.appendChild(image);

  // Também permite selecionar clicando na imagem
  card.addEventListener('click', () => {
    selectProduct(key);
  });

  packImageCards.set(key, card);
  packImageCarousel.appendChild(card);

});

// Insere o carrossel na área visual da vitrine
featureMedia.prepend(packImageCarousel);

function updatePackCarousel(key) {

  const activeIndex = packOrder.indexOf(key);
  const total = packOrder.length;

  packOrder.forEach((packKey, index) => {

    const card = packImageCards.get(packKey);

    // Mantém o carrossel circular
    const offset =
      ((index - activeIndex + total + 2) % total) - 2;

    const isActive = offset === 0;
    const isVisible = Math.abs(offset) <= 1;

    card.style.setProperty('--offset', offset);

    card.classList.toggle('is-active', isActive);
    card.classList.toggle('is-visible', isVisible);

    card.setAttribute('aria-pressed', String(isActive));
    card.setAttribute('aria-hidden', String(!isVisible));

  });

  featureMedia.classList.add('has-photo');

}

// Navegação por gestos no carrossel de packs

let packTouchStart = null;
let suppressPackClickUntil = 0;

packImageCarousel.addEventListener('touchstart', event => {

  if (event.touches.length !== 1) {
    packTouchStart = null;
    return;
  }

  packTouchStart = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  };

}, { passive: true });

packImageCarousel.addEventListener('touchend', event => {

  if (!packTouchStart) return;

  const touch = event.changedTouches[0];

  const deltaX = touch.clientX - packTouchStart.x;
  const deltaY = touch.clientY - packTouchStart.y;

  packTouchStart = null;

  // Ignora toques simples e rolagens verticais
  if (
    Math.abs(deltaX) < 45 ||
    Math.abs(deltaX) <= Math.abs(deltaY) * 1.3
  ) return;

  const direction = deltaX < 0 ? 1 : -1;

  const currentIndex = packOrder.indexOf(currentProduct);

  const nextIndex = (
    currentIndex +
    direction +
    packOrder.length
  ) % packOrder.length;

  suppressPackClickUntil = performance.now() + 400;

  selectProduct(packOrder[nextIndex]);

}, { passive: true });

packImageCarousel.addEventListener('touchcancel', () => {
  packTouchStart = null;
});

// Evita cliques acidentais após deslizar

packImageCarousel.addEventListener('click', event => {

  if (
    event.detail !== 0 &&
    performance.now() < suppressPackClickUntil
  ) {
    event.preventDefault();
    event.stopPropagation();
  }

}, true);

// Define a posição inicial
updatePackCarousel(currentProduct);


function selectProduct(key, focus = false) {

    currentProduct = key;
    const product = products[key];
    
$('#pack-category').textContent = product.eyebrow;
$('#pack-title').textContent = product.title;
$('#pack-description').textContent = product.description;
$('#pack-caption').textContent = product.caption;




// Movimenta o carrossel até o pack selecionado
updatePackCarousel(key);
    

$('#pack-price').textContent = '[Preço a definir]';

$('#add-feature-pack').textContent = ({
  tasting: 'Quero experimentar →',
  twelve: 'Escolher meus sabores →',
  eighteen: 'Montar meu pack →',
  twentyfour: 'Quero personalizar →',
  thirty: 'Criar meu pack →'
})[key];


    $('#pack-visual').setAttribute('aria-label', 'Ilustração do produto: ' + product.name);
    $('#pack-bottles').replaceChildren(...Array.from({length: product.bottles}, () => {
      let el = document.createElement('div');
      el.className = 'bottle-drawing';
      return el;
    }));
    tabs.forEach(tab => {
      const active = tab.dataset.pack === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) $('#pack-panel').setAttribute('aria-labelledby', tab.id);
    });
    if (focus) tabs.find(tab => tab.dataset.pack === key).focus();
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => selectProduct(tab.dataset.pack));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = tabs.indexOf(tab);
      const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectProduct(tabs[targetIndex].dataset.pack, true);
    });
  
  });

  // Setas do carrossel de packs

  $$('.pack-carousel-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {

      const index = tabs.findIndex(
        tab => tab.dataset.pack === currentProduct
      );

      const nextIndex = (
        index + Number(arrow.dataset.step) + tabs.length
      ) % tabs.length;

      const nextTab = tabs[nextIndex];

      // Atualiza o produto exibido na vitrine
      selectProduct(nextTab.dataset.pack, true);

      // Centraliza a opção escolhida no carrossel
      nextTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });

    });
  });

  

// Exibe o Kit Degustação ao carregar a vitrine
selectProduct('tasting');

const cart = [];

// Benefícios ilustrativos.

// Ajuste após a definição comercial das ofertas.
const benefitTiers = [
  {
    min: 6,
    title: 'Boas-vindas',
    example: 'Ex.: mimo inicial',
    icon: '✦'
  },
  {
    min: 12,
    title: 'Brinde extra',
    example: 'Ex.: garrafa bônus',
    icon: '🎁'
  },
  {
    min: 18,
    title: 'Vantagem especial',
    example: 'Ex.: desconto adicional',
    icon: '✧'
  },
  {
    min: 24,
    title: 'Entrega especial',
    example: 'Ex.: frete promocional',
    icon: '✈'
  },
  {
    min: 30,
    title: 'Presente premium',
    example: 'Ex.: brinde exclusivo',
    icon: '★'
  }
];

function renderBenefitPanel(panel, bottles, note = '') {
  if (!panel) return;

  const reached = benefitTiers.filter(tier => bottles >= tier.min);
  const next = benefitTiers.find(tier => bottles < tier.min);

  const nextMessage = next
    ? `Faltam ${next.min - bottles} garrafas para a etapa de ${next.min}.`
    : 'Você atingiu todas as etapas exibidas. Continue montando sua caixa sem limite.';

  const count = panel.querySelector('.benefits-unlock-count');
  const fill = panel.querySelector('.benefits-unlock-fill');
  const meter = panel.querySelector('.benefits-unlock-meter');
  const nextLabel = panel.querySelector('.benefits-unlock-next');
  let tiers = panel.querySelector('.benefits-unlock-tiers');

  if (!tiers) return;

  if (count) {
  count.textContent = `${bottles} garrafas · ${reached.length} de ${benefitTiers.length} etapas`;
}

  const percentage = Math.min(100, (bottles / 30) * 100);

if (fill) {
  fill.style.width = `${percentage}%`;
}

if (meter) {
  meter.setAttribute(
    'aria-valuenow',
    String(Math.min(30, bottles))
  );

  meter.setAttribute(
    'aria-valuetext',
    `${bottles} garrafas; ${reached.length} etapas ilustrativas atingidas`
  );
}

if (nextLabel) {
  nextLabel.textContent = note
    ? `${nextMessage} ${note}`
    : nextMessage;
}

  // cria o viewport apenas uma vez
  if (!tiers.parentElement.classList.contains('benefits-unlock-viewport')) {
    const viewport = document.createElement('div');
    viewport.className = 'benefits-unlock-viewport';
    tiers.before(viewport);
    viewport.appendChild(tiers);
  }

  tiers.replaceChildren();

  benefitTiers.forEach(tier => {
    const achieved = bottles >= tier.min;

    const card = document.createElement('div');
    card.className =
      'benefits-unlock-tier' + (achieved ? ' is-reached' : '');

    card.setAttribute(
      'aria-label',
      `${tier.min} garrafas: ${tier.title}. ${
        achieved ? 'Etapa atingida' : 'Etapa pendente'
      }. Benefício ilustrativo.`
    );

    const icon = document.createElement('span');
    icon.className = 'benefits-unlock-icon';
    icon.textContent = achieved ? '✓' : tier.icon;
    icon.setAttribute('aria-hidden', 'true');

    const quantity = document.createElement('strong');
    quantity.textContent = `${tier.min} garrafas`;

    const title = document.createElement('span');
    title.className = 'benefits-unlock-tier-title';
    title.textContent = tier.title;

    const example = document.createElement('small');
    example.textContent = tier.example;

    card.append(icon, quantity, title, example);
    tiers.append(card);
  });

  // MOBILE: mostra 2 cards e desliza 1 card por vez
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const startIndex = isMobile
    ? Math.min(reached.length, benefitTiers.length - 2)
    : 0;

  tiers.style.setProperty('--benefit-slide', String(startIndex));
}

function featuredBenefitCopy(bottles) {
  if (!bottles) {
    return 'Kit Degustação: quantidade a confirmar. Benefícios ainda não definidos.';
  }

  const reached = benefitTiers.filter(
    tier => bottles >= tier.min
  ).length;

  return `${bottles} garrafas: ${reached} de ${benefitTiers.length} etapas ilustrativas atingidas. Brindes e condições a confirmar.`;
}

let toastTimer;

  function toast(message) {
    const el = $('#toast');
    el.textContent = message; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.hidden = true, 2600);
  }
  function renderCart() {
    
const totalBoxes = cart.reduce(
  (sum, item) => sum + item.qty, 0
);

const knownBottles = cart.reduce(
  (sum, item) => sum + (item.bottles ?? 0) * item.qty, 0
);

const unresolved = cart.some(
  item => item.bottles === null
);

// Atualiza a régua com o total do carrinho
renderBenefitPanel(
  $('#cart-benefits'),
  knownBottles,
  unresolved
    ? 'O Kit Degustação sem quantidade definida não entra nessa soma.'
    : ''
);

$('#cart-count').textContent = String(totalBoxes);

    $('#cart-list').replaceChildren();
    if (!cart.length) {
      const empty = document.createElement('p');
      empty.className = 'small-note'; empty.textContent = 'Seu carrinho ainda está vazio. Que tal conhecer nossos packs?';
      $('#cart-list').append(empty);
    } else {
      cart.forEach((item, index) => {
        const row = document.createElement('div'); row.className = 'cart-item';
        const info = document.createElement('div');
        const name = document.createElement('strong'); name.textContent = item.name;
        const small = document.createElement('small');
        small.textContent = item.qty + (item.qty === 1 ? ' caixa · ' : ' caixas · ') + (item.bottles === null ? 'quantidade de garrafas a confirmar' : (item.bottles * item.qty) + ' garrafas');
        info.append(name, small);
        const remove = document.createElement('button');
remove.className = 'remove-btn';
remove.type = 'button';
remove.setAttribute('aria-label', 'Remover item do carrinho');
remove.setAttribute('title', 'Remover item');

remove.innerHTML = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM7 9h2v8H7V9zm1 12h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2z"/>
  </svg>
`;

remove.addEventListener('click', () => {
  cart.splice(index, 1);
  renderCart();
});
        row.append(info, remove); $('#cart-list').append(row);
      });
    }
    $('#checkout').disabled = totalBoxes === 0;
  }
  
function addToCart(name, bottles) {

  const item = cart.find(row => row.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({name, bottles, qty: 1});
  }

  renderCart();

  // Abre somente se o carrinho estiver fechado
  if (drawer.hidden) {
    openOverlay(drawer);
  }

}

  $('#add-feature-pack').addEventListener('click', () => {
    const product = products[currentProduct];
    if (currentProduct === 'tasting') {
      addToCart(product.name, product.count);
    } else {
      openPackFlavorChooser(currentProduct);
    }
  });

  // "Monte seu kit": cada sabor pode ter qualquer quantidade de grupos fechados de 6.
  const flavors = ['Sabor 01','Sabor 02','Sabor 03','Sabor 04'];

// Adicionar sabores diretamente pelo carrinho

const cartExtraFlavor = $('#cart-extra-flavor');

flavors.forEach(flavor => {
  const option = document.createElement('option');

  option.value = flavor;
  option.textContent = flavor;

  cartExtraFlavor.appendChild(option);
});

$('#cart-add-extra').addEventListener('click', () => {

  const flavor = cartExtraFlavor.value;

  if (!flavors.includes(flavor)) return;

  addToCart('Pack extra de 6 · ' + flavor, 6);

});
  // Packs da vitrine: o cliente deve completar todas as posições de 6 antes de adicionar.
  const packFlavorModal = $('#pack-flavor-modal');
  let pendingPack = null;
  let pendingCounts = new Map();
  function openPackFlavorChooser(key) {
    pendingPack = products[key];
    pendingCounts = new Map(flavors.map(flavor => [flavor, 0]));
    const groups = pendingPack.count / 6;
    $('#flavor-modal-title').textContent =
    'Personalize seu pack de ' + pendingPack.count;
    $('#pack-flavor-options').replaceChildren();
    flavors.forEach(flavor => {
      const row = document.createElement('div'); row.className = 'pack-flavor-option'; row.dataset.flavor = flavor;
      const name = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = flavor;
      name.append(title);
      const stepper = document.createElement('div'); stepper.className = 'pack-flavor-stepper';
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.dataset.role = 'minus'; minus.setAttribute('aria-label', 'Remover 6 garrafas de ' + flavor);
      const output = document.createElement('output'); output.dataset.role = 'value'; output.setAttribute('aria-label', 'Garrafas de ' + flavor); output.textContent = '0';
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.dataset.role = 'plus'; plus.setAttribute('aria-label', 'Adicionar 6 garrafas de ' + flavor);
      minus.addEventListener('click', () => { pendingCounts.set(flavor, Math.max(0, pendingCounts.get(flavor) - 1)); syncPackFlavorChooser(); });
      plus.addEventListener('click', () => { if (selectedPackGroups() < groups) pendingCounts.set(flavor, pendingCounts.get(flavor) + 1); syncPackFlavorChooser(); });
      stepper.append(minus, output, plus); row.append(name, stepper); $('#pack-flavor-options').append(row);
    });
    syncPackFlavorChooser();
    openOverlay(packFlavorModal);
  }
  function selectedPackGroups() { return [...pendingCounts.values()].reduce((sum, n) => sum+n, 0); }
  

function syncPackFlavorChooser() {

  if (!pendingPack) return;

  const groups = pendingPack.count / 6;
  const selected = selectedPackGroups();
  const bottles = selected * 6;

  // Atualiza os benefícios
  renderBenefitPanel(
    $('#pack-benefits'),
    bottles
  );

  // Atualiza os sabores
  $$('.pack-flavor-option').forEach(row => {

    const flavor = row.dataset.flavor;
    const n = pendingCounts.get(flavor);

    row.querySelector('[data-role="value"]')
      .textContent = n * 6;

    row.querySelector('[data-role="minus"]')
      .disabled = n === 0;

    row.querySelector('[data-role="plus"]')
      .disabled = selected >= groups;

    row.classList.toggle('is-picked', n > 0);

  });

  // Contador único
  $('#flavor-modal-bottle-count').textContent =
    bottles + ' de ' + pendingPack.count + ' garrafas';

  // Barra de progresso
  $('#flavor-progress-segments').replaceChildren(
    ...Array.from({ length: groups }, (_, i) => {

      const piece = document.createElement('span');

      if (i < selected) {
        piece.className = 'filled';
      }

      return piece;

    })
  );

  // Libera a compra somente com o pack completo
  const confirm = $('#confirm-pack-flavors');

  confirm.disabled = selected !== groups;

  confirm.textContent = 'Adicionar ao carrinho →';

}

  $('#confirm-pack-flavors').addEventListener('click', () => {
    if (!pendingPack || selectedPackGroups()*6 !== pendingPack.count) return;
    const composition = flavors.filter(f => pendingCounts.get(f) > 0)
      .map(f => f + ' × ' + (pendingCounts.get(f)*6)).join(', ');
    const name = pendingPack.name + ' (' + composition + ')';
    const count = pendingPack.count;
    closeOverlays();
    addToCart(name, count);
  });
  $('#close-pack-flavors').addEventListener('click', closeOverlays);
  const packQty = new Map(flavors.map(flavor => [flavor, 0]));

const flavorMeta = {
  'Laranja': { short: 'LA', accent: '#f2a548' },
  'Uva': { short: 'UV', accent: '#8a6bb8' },
  'Pink Lemonade': { short: 'PL', accent: '#ea78b7' },
  'Maçã': { short: 'MA', accent: '#8cbf74' }
};

const totalPacks = () => [...packQty.values()].reduce((sum, qty) => sum + qty, 0);

function buildKitOptions() {
  const container = $('#kit-options');
  container.replaceChildren();

  flavors.forEach((flavor) => {
    const meta = flavorMeta[flavor] || {
      short: flavor.slice(0, 2).toUpperCase(),
      accent: '#2f7d57'
    };

    const row = document.createElement('article');
    row.className = 'kit-flavor-card';
    row.dataset.flavor = flavor;
    row.style.setProperty('--flavor-accent', meta.accent);

    const thumb = document.createElement('div');
    thumb.className = 'kit-flavor-thumb';
    thumb.setAttribute('data-short', meta.short);
    thumb.textContent = meta.short;

    const info = document.createElement('div');
    info.className = 'kit-flavor-info';

    const title = document.createElement('strong');
    title.textContent = flavor;

    const ingredients = document.createElement('a');
    ingredients.href = '#faq';
    ingredients.className = 'kit-flavor-link';
    ingredients.textContent = 'INGREDIENTES';

    const note = document.createElement('small');
    note.className = 'kit-flavor-note';
    note.dataset.role = 'flavor-note';
    note.textContent = 'Cada adição equivale a 6 garrafas';

    info.append(title, ingredients, note);

    const action = document.createElement('div');
    action.className = 'kit-flavor-action';

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'kit-add-button';
    addButton.dataset.role = 'add';
    addButton.textContent = 'Adicionar';
    addButton.setAttribute('aria-label', 'Adicionar 6 garrafas de ' + flavor);
    addButton.addEventListener('click', () => {
      packQty.set(flavor, 1);
      syncKit();
    });

    const stepper = document.createElement('div');
    stepper.className = 'kit-stepper';
    stepper.dataset.role = 'stepper';
    stepper.hidden = true;

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.textContent = '−';
    minus.dataset.role = 'minus';
    minus.setAttribute('aria-label', 'Remover um pack de 6 de ' + flavor);
    minus.addEventListener('click', () => {
      packQty.set(flavor, Math.max(0, packQty.get(flavor) - 1));
      syncKit();
    });

    const countWrap = document.createElement('div');
    countWrap.className = 'kit-stepper-count';

    const output = document.createElement('output');
    output.dataset.role = 'amount';
    output.setAttribute('aria-label', 'Quantidade de garrafas de ' + flavor);
    output.textContent = '6';

    const unit = document.createElement('span');
    unit.textContent = 'garrafas';

    countWrap.append(output, unit);

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.textContent = '+';
    plus.dataset.role = 'plus';
    plus.setAttribute('aria-label', 'Adicionar mais um pack de 6 de ' + flavor);
    plus.addEventListener('click', () => {
      packQty.set(flavor, packQty.get(flavor) + 1);
      syncKit();
    });

    
stepper.append(minus, countWrap, plus);
action.append(addButton, stepper);

// Botão para remover todo o sabor de uma vez
const removeButton = document.createElement('button');
removeButton.type = 'button';
removeButton.className = 'kit-remove-button';
removeButton.dataset.role = 'remove';
removeButton.hidden = true;

removeButton.setAttribute(
  'aria-label',
  'Remover todas as garrafas de ' + flavor
);

removeButton.innerHTML = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M10 4h4M6 7l1 13h10l1-13M10 11v6M14 11v6"/>
  </svg>
`;

removeButton.addEventListener('click', () => {
  packQty.set(flavor, 0);
  syncKit();
});

row.append(thumb, info, action, removeButton);
container.append(row);

  });
}


function syncKit() {
  const packs = totalPacks();
  const bottles = packs * 6;

  // Atualiza os benefícios conforme os sabores escolhidos
  renderBenefitPanel(
    $('#kit-benefits'),
    bottles
  );

  $$('.kit-flavor-card').forEach(row => {

    const flavor = row.dataset.flavor;
    const qty = packQty.get(flavor);
    const selected = qty > 0;

    row.classList.toggle('is-selected', selected);

    const note = row.querySelector('[data-role="flavor-note"]');
    const addButton = row.querySelector('[data-role="add"]');
    const stepper = row.querySelector('[data-role="stepper"]');
    const minus = row.querySelector('[data-role="minus"]');
    const output = row.querySelector('[data-role="amount"]');

    note.textContent = selected
      ? qty + (qty === 1 ? ' pack selecionado · ' : ' packs selecionados · ') + (qty * 6) + ' garrafas'
      : 'Cada adição equivale a 6 garrafas';

    
addButton.hidden = selected;
stepper.hidden = !selected;
minus.disabled = !selected;
output.textContent = String(qty * 6 || 6);

// Exibe o botão de remover somente quando selecionado
row.querySelector('[data-role="remove"]').hidden = !selected;

  });

  const selectedFlavors = flavors.filter(flavor => packQty.get(flavor) > 0);

  $('#kit-quantity').textContent = String(bottles);

  $('#kit-description').textContent = selectedFlavors.length
    ? selectedFlavors.map(flavor => flavor + ': ' + (packQty.get(flavor) * 6) + ' garrafas').join(' · ')
    : 'Selecione ao menos um sabor';

  $('#add-kit').disabled = packs === 0;

  $('#kit-feedback').textContent = packs === 0
    ? 'Comece adicionando seu primeiro sabor. Você pode repetir qualquer um deles quantas vezes quiser.'
    : 'Sua caixa tem ' + bottles + ' garrafas. Você pode adicioná-la ao carrinho ou continuar incluindo packs de 6.';
}

buildKitOptions();
syncKit();

$('#add-kit').addEventListener('click', () => {
  const count = totalPacks() * 6;
  if (!count) return;

  const combination = flavors
    .filter(flavor => packQty.get(flavor) > 0)
    .map(flavor => flavor + ' × ' + (packQty.get(flavor) * 6))
    .join(', ');

  addToCart('Monte seu kit · ' + count + ' garrafas (' + combination + ')', count);

  flavors.forEach(flavor => packQty.set(flavor, 0));
  syncKit();
});

  const scrim = $('#scrim'), drawer = $('#cart-drawer'), modal = $('#video-modal');
  let lastFocus = null;
  function openOverlay(el) {
    lastFocus = document.activeElement;
    scrim.hidden = false; el.hidden = false; document.body.style.overflow = 'hidden';
    (el.querySelector('button') || el).focus();
  }
  function closeOverlays() {
    scrim.hidden = true; drawer.hidden = true; modal.hidden = true; packFlavorModal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus?.focus) lastFocus.focus();
  }
  $('#open-cart').addEventListener('click', () => openOverlay(drawer));
  $('#close-cart').addEventListener('click', closeOverlays);
  $('#close-video').addEventListener('click', closeOverlays);
  $('#done-video').addEventListener('click', closeOverlays);
  scrim.addEventListener('click', closeOverlays);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlays(); });
  $('#checkout').addEventListener('click', () => toast('Checkout ainda não incluído neste protótipo.'));
  
$$('.video-card').forEach(b => b.addEventListener('click', () => {
  $('#video-title').textContent = b.dataset.video;
  openOverlay(modal);
}));

// SEÇÃO 08 — ABAS DE VÍDEOS E AVALIAÇÕES

const socialTabs = $$('.social-tab');

function showSocialTab(tabName, focus = false) {
  socialTabs.forEach(tab => {
    const active = tab.dataset.socialTab === tabName;

    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;

    if (active && focus) tab.focus();
  });

  $('#social-videos').hidden = tabName !== 'videos';
  $('#social-reviews').hidden = tabName !== 'reviews';
}

socialTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    showSocialTab(tab.dataset.socialTab);
  });

  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End']
      .includes(event.key)) return;

    event.preventDefault();

    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? socialTabs.length - 1
        : (
            index +
            (event.key === 'ArrowRight' ? 1 : -1) +
            socialTabs.length
          ) % socialTabs.length;

    showSocialTab(socialTabs[next].dataset.socialTab, true);
  });
});


  
  // MENU MOBILE — ATIVAÇÃO SOMENTE POR CLIQUE

  const navItems = $$('.mobile-nav-item');

  function activateNav(id) {
    navItems.forEach(link => {
      const active = link.dataset.nav === id;

      link.classList.toggle('is-active', active);

      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // A animação é acionada exclusivamente pelo clique.
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      activateNav(link.dataset.nav);
    });
  });

  renderCart();
})();

