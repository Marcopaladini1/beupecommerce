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

  const products = {
    tasting: {
      name: 'Kit Degustação · 4 sabores', count: null, eyebrow: 'DESTAQUE · KIT DEGUSTAÇÃO',
      title: 'Primeira vez por aqui? Conheça nossos 4 sabores.',
      description: 'Descubra os sabores da marca e encontre aquele que combina mais com você.',
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
  tasting: null,
  twelve: null,
  eighteen: null,
  twentyfour: null,
  thirty: null
};

let currentProduct = 'tasting';
  const tabs = $$('.pack-tab');
  function selectProduct(key, focus = false) {
    currentProduct = key;
    const product = products[key];
    $('#pack-category').textContent = product.eyebrow;
    $('#pack-title').textContent = product.title;
    $('#pack-description').textContent = product.description;
    $('#pack-quantity').textContent = product.quantity;
    $('#pack-composition').textContent = product.composition;
    $('#pack-caption').textContent = product.caption;

const photo = $('#pack-photo');
const visual = $('#pack-visual');

photo.hidden = true;
visual.classList.remove('has-photo');
photo.removeAttribute('src');

if (productPhotos[key]) {
  photo.onload = () => {
    photo.hidden = false;
    visual.classList.add('has-photo');
  };

  photo.onerror = () => {
    photo.hidden = true;
    visual.classList.remove('has-photo');
  };

  photo.alt = 'Foto do ' + product.name;
  photo.src = productPhotos[key];
}
    $('#pack-price').textContent = '[Preço a definir]';
    $('#pack-footnote').textContent = product.footnote;
    $('#add-feature-pack').textContent = ({tasting: 'Quero experimentar →', twelve: 'Escolher meus sabores →', eighteen: 'Montar meu pack →', twentyfour: 'Quero personalizar →', thirty: 'Criar meu pack →'})[key];
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

  const cart = [];

  let toastTimer;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.hidden = true, 2600);
  }
  function renderCart() {
    const totalBoxes = cart.reduce((sum, item) => sum + item.qty, 0);
    const knownBottles = cart.reduce((sum, item) => sum + (item.bottles ?? 0) * item.qty, 0);
    const unresolved = cart.some(item => item.bottles === null);
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
        const remove = document.createElement('button'); remove.className = 'remove-btn'; remove.type = 'button'; remove.textContent = 'Remover';
        remove.addEventListener('click', () => { cart.splice(index, 1); renderCart(); });
        row.append(info, remove); $('#cart-list').append(row);
      });
    }
    $('#cart-total-label').textContent = !totalBoxes ? 'Seu próximo favorito está a um clique.' : totalBoxes + (totalBoxes === 1 ? ' caixa' : ' caixas') + ' · ' + knownBottles + ' garrafas confirmadas' + (unresolved ? ' + Kit Degustação (composição pendente)' : '') + ' · preços a definir';
    $('#checkout').disabled = totalBoxes === 0;
  }
  function addToCart(name, bottles) {
    const item = cart.find(row => row.name === name);
    if (item) item.qty++; else cart.push({name, bottles, qty:1});
    renderCart(); toast('Adicionado: ' + name);
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
  // Packs da vitrine: o cliente deve completar todas as posições de 6 antes de adicionar.
  const packFlavorModal = $('#pack-flavor-modal');
  let pendingPack = null;
  let pendingCounts = new Map();
  function openPackFlavorChooser(key) {
    pendingPack = products[key];
    pendingCounts = new Map(flavors.map(flavor => [flavor, 0]));
    const groups = pendingPack.count / 6;
    $('#flavor-modal-title').textContent = 'Escolha os sabores do pack de ' + pendingPack.count;
    $('#flavor-modal-intro').textContent = groups + (groups === 1 ? ' grupo fechado de 6 garrafas. ' : ' grupos fechados de 6 garrafas. ') + 'Escolha a quantidade de cada sabor usando + e −. Você pode repetir sabores e deve completar exatamente ' + pendingPack.count + ' garrafas.';
    $('#pack-flavor-options').replaceChildren();
    flavors.forEach(flavor => {
      const row = document.createElement('div'); row.className = 'pack-flavor-option'; row.dataset.flavor = flavor;
      const name = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = flavor;
      const description = document.createElement('small'); description.dataset.role = 'detail'; description.textContent = '0 garrafas selecionadas';
      name.append(title, description);
      const stepper = document.createElement('div'); stepper.className = 'pack-flavor-stepper';
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.dataset.role = 'minus'; minus.setAttribute('aria-label', 'Remover 6 garrafas de ' + flavor);
      const output = document.createElement('output'); output.dataset.role = 'value'; output.setAttribute('aria-label', 'Packs de 6 de ' + flavor); output.textContent = '0';
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
    const missing = groups - selected;
    $$('.pack-flavor-option').forEach(row => {
      const flavor = row.dataset.flavor;
      const n = pendingCounts.get(flavor);
      row.querySelector('[data-role="value"]').textContent = n;
      row.querySelector('[data-role="detail"]').textContent = n === 0 ? '0 garrafas selecionadas' : n*6 + ' garrafas · ' + n + (n === 1 ? ' grupo de 6' : ' grupos de 6');
      row.querySelector('[data-role="minus"]').disabled = n === 0;
      row.querySelector('[data-role="plus"]').disabled = selected >= groups;
      row.classList.toggle('is-picked', n > 0);
    });
    $('#flavor-modal-progress').textContent = selected + ' de ' + groups + ' grupos escolhidos';
    $('#flavor-modal-bottle-count').textContent = (selected*6) + '/' + pendingPack.count + ' garrafas';
    $('#flavor-progress-segments').replaceChildren(...Array.from({length:groups}, (_, i) => {
      const piece = document.createElement('span');
      if (i < selected) piece.className = 'filled';
      return piece;
    }));
    const selectedFlavors = flavors.filter(f => pendingCounts.get(f) > 0);
    $('#flavor-modal-summary').textContent = selectedFlavors.length
      ? selectedFlavors.map(f => f + ' × ' + (pendingCounts.get(f)*6)).join(' · ')
      : 'Escolha os sabores para completar sua caixa.';
    $('#flavor-modal-hint').textContent = missing > 0
      ? 'Faltam ' + missing + (missing === 1 ? ' grupo de 6 garrafas' : ' grupos de 6 garrafas') + ' para completar seu pack.'
      : 'Pack completo! Confira os sabores e confirme abaixo.';
    const confirm = $('#confirm-pack-flavors');
    confirm.disabled = missing !== 0;
    confirm.textContent = missing === 0 ? 'Confirmar e adicionar ' + pendingPack.count + ' garrafas →' : 'Escolha mais ' + missing + (missing === 1 ? ' grupo' : ' grupos');
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
  $('#cancel-pack-flavors').addEventListener('click', closeOverlays);
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

    row.append(thumb, info, action);
    container.append(row);
  });
}

function syncKit() {
  const packs = totalPacks();
  const bottles = packs * 6;

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
  });

  const selectedFlavors = flavors.filter(flavor => packQty.get(flavor) > 0);

  $('#kit-selection-status').textContent = selectedFlavors.length
    ? 'Escolha os sabores (' + bottles + ' garrafas)'
    : 'Escolha os sabores (0 garrafas)';

  $('#kit-quantity').textContent = String(bottles);
  $('#kit-packs').textContent = packs + (packs === 1 ? ' pack de 6' : ' packs de 6');

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


  const navItems = $$('.mobile-nav-item');
  const navDestinations = ['inicio','produtos','monte-kit','social'];
  function activateNav(id) {
    navItems.forEach(link => {
      const active = link.dataset.nav === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
  }
  navItems.forEach(link => link.addEventListener('click', () => activateNav(link.dataset.nav)));
  if ('IntersectionObserver' in window) {
    const observed = navDestinations.map(id => $('#' + id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const candidates = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (candidates.length) activateNav(candidates[0].target.id);
    }, { rootMargin:'-10% 0px -55% 0px', threshold:0 });
    observed.forEach(section => observer.observe(section));
  }
  
  // Seção 06 — Lifestyle
  const lifestyleMoments = {
    rotina: {
      category: 'NO SEU DIA A DIA',
      title: 'Cabe na rotina. Combina com você.',
      description: 'Entre os compromissos e os planos do dia, tem sempre um momento para seu sabor favorito.',
      labels: [
        '[Foto principal: produto na rotina]',
        '[Foto: momento de consumo]',
        '[Foto: cotidiano]'
      ],
      photos: [
  'assets/lifestyle/rotina-principal.webp',
  'assets/lifestyle/rotina-consumo.webp',
  'assets/lifestyle/rotina-cotidiano.webp'
]
    },

    treino: {
      category: 'NO SEU RITMO',
      title: 'Do movimento à próxima conquista.',
      description: 'Um sabor para acompanhar seus momentos de atividade, sem complicar sua escolha.',
      labels: [
        '[Foto principal: pessoa com o suco após treino]',
        '[Foto: movimento]',
        '[Foto: atividade ao ar livre]'
      ],
      photos: [
  'assets/lifestyle/rotina-principal.webp',
  'assets/lifestyle/rotina-consumo.webp',
  'assets/lifestyle/rotina-cotidiano.webp'
]
    },

    pausa: {
      category: 'UM TEMPO PRA VOCÊ',
      title: 'Pequenas pausas. Bons momentos.',
      description: 'Quando o dia pede uma pausa, seu sabor favorito também pode fazer parte dela.',
      labels: [
        '[Foto principal: pessoa fazendo uma pausa]',
        '[Foto: suco sobre uma mesa]',
        '[Foto: momento de descanso]'
      ],
      photos: [
  'assets/lifestyle/rotina-principal.webp',
  'assets/lifestyle/rotina-consumo.webp',
  'assets/lifestyle/rotina-cotidiano.webp'
]
    },

    lazer: {
      category: 'COM QUEM VOCÊ GOSTA',
      title: 'Mais encontros. Mais histórias.',
      description: 'No passeio, no encontro com amigos ou naquele fim de tarde sem pressa.',
      labels: [
        '[Foto principal: amigos com o suco]',
        '[Foto: passeio]',
        '[Foto: momento compartilhado]'
      ],
      photos: [
  'assets/lifestyle/rotina-principal.webp',
  'assets/lifestyle/rotina-consumo.webp',
  'assets/lifestyle/rotina-cotidiano.webp'
]
    }
  };

  const lifestyleTabs = $$('.lifestyle-tab');

  function selectLifestyleMoment(moment, focus = false) {
    const data = lifestyleMoments[moment];
    if (!data) return;

    $('#life-story-category').textContent = data.category;
    $('#life-story-title').textContent = data.title;
    $('#life-story-description').textContent = data.description;

    const labels = [
      '#life-label-main',
      '#life-label-secondary',
      '#life-label-tertiary'
    ];

    const images = [
      '#life-image-main',
      '#life-image-secondary',
      '#life-image-tertiary'
    ];

    labels.forEach((selector, index) => {
      $(selector).textContent = data.labels[index];

      const image = $(images[index]);
      image.hidden = true;
      image.removeAttribute('src');

      if (data.photos[index]) {
        image.onload = () => {
          image.hidden = false;
        };

        image.onerror = () => {
          image.hidden = true;
        };

        image.alt = data.labels[index]
          .replaceAll('[', '')
          .replaceAll(']', '');

        image.src = data.photos[index];
      }
    });

    lifestyleTabs.forEach(tab => {
      const active = tab.dataset.moment === moment;

      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;

      if (active) {
        $('#lifestyle-panel')
          .setAttribute('aria-labelledby', tab.id);
      }
    });

    if (focus) {
      lifestyleTabs
        .find(tab => tab.dataset.moment === moment)
        ?.focus();
    }
  }

  lifestyleTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      selectLifestyleMoment(tab.dataset.moment);
    });

    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End']
        .includes(event.key)) return;

      event.preventDefault();

      const next = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lifestyleTabs.length - 1
          : (
              index +
              (event.key === 'ArrowRight' ? 1 : -1) +
              lifestyleTabs.length
            ) % lifestyleTabs.length;

      selectLifestyleMoment(
        lifestyleTabs[next].dataset.moment,
        true
      );
    });
  });

  selectLifestyleMoment('rotina');

  renderCart();
})();

