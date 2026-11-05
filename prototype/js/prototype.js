/* =========================================================================
   Prototype-interactie — UI/UX 1 · Yiming · 1192702

   De states die in 9.1 en 10.4 beschreven staan, zijn hier echt gemaakt:
   loading, focus, disabled en de succesmelding. Zo is in de video te zien
   dat het voorstel niet alleen een plaatje is.
   ========================================================================= */
(function () {
  'use strict';

  var MIN_QTY = 3;

  /* ---------------- maat kiezen ---------------- */
  var sizeLabel = document.getElementById('sizeLabel');
  var sizes = Array.prototype.slice.call(document.querySelectorAll('.size[data-cm]'));

  sizes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizes.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      if (sizeLabel) {
        sizeLabel.textContent = btn.dataset.cm + ' cm (' + btn.dataset.in + ' in)';
      }
    });
  });

  /* ---------------- aantal ---------------- */
  var qty = document.getElementById('qty');
  var minus = document.getElementById('qtyMinus');
  var plus = document.getElementById('qtyPlus');
  var error = document.getElementById('error');
  var notice = document.getElementById('notice');
  var noticeText = document.getElementById('noticeText');

  function value() { return parseInt((qty && qty.value) || '0', 10) || 0; }

  function check(min, show) {
    if (!qty) return true;
    var ok = value() >= min;
    if (show && error) error.hidden = ok;
    return ok;
  }

  if (plus) plus.addEventListener('click', function () {
    qty.value = value() + 1;
    check(MIN_QTY, false);
  });

  if (minus) minus.addEventListener('click', function () {
    qty.value = Math.max(MIN_QTY, value() - 1);
    check(MIN_QTY, false);
  });

  if (qty) qty.addEventListener('input', function () { check(MIN_QTY, false); });

  /* ---------------- toevoegen aan winkelwagen ---------------- */
  var addBtn = document.getElementById('addToCart');
  var cartCount = document.getElementById('cartCount');
  var count = 0;

  if (addBtn) {
    addBtn.addEventListener('click', function () {
      /* 1. validatie: nooit alleen een kleur, altijd icoon + tekst (9.2) */
      if (!check(MIN_QTY, true)) return;

      /* 2. loading-state: label blijft staan, spinner verschijnt */
      addBtn.classList.add('is-loading');
      addBtn.setAttribute('aria-busy', 'true');

      /* 3. na 700 ms de succes-state, op de plek van de actie */
      window.setTimeout(function () {
        addBtn.classList.remove('is-loading');
        addBtn.removeAttribute('aria-busy');

        count += value();
        if (cartCount) cartCount.textContent = count;
        if (noticeText) {
          noticeText.textContent = 'Added — ' + value() + ' pcs · ' + cartCount.textContent + ' in cart';
        }
        if (notice) {
          notice.hidden = false;
          /* status-bericht blijft 6 s staan, zodat de gebruiker het ziet */
          window.setTimeout(function () { notice.hidden = true; }, 6000);
        }
      }, 700);
    });
  }

  /* ---------------- filters (categoriepagina) ---------------- */
  var chips = document.getElementById('activeChips');
  var resultCount = document.getElementById('resultCount');
  var showBtn = document.getElementById('showResults');
  var total = 128;

  function updateCount() {
    if (resultCount) resultCount.textContent = total + ' results';
    if (showBtn) showBtn.textContent = 'Show ' + total + ' results';
  }

  if (chips) {
    chips.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip-x');
      if (!chip) return;
      chip.remove();
      total = Math.max(12, total - 37);   /* demo: filter weg = meer resultaten */
      updateCount();
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.size-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
      total = Math.max(12, total + (on ? 37 : -37));
      updateCount();
    });
  });

  if (showBtn) {
    showBtn.addEventListener('click', function () {
      showBtn.textContent = 'Showing ' + total + ' results';
      window.setTimeout(function () { showBtn.textContent = 'Show ' + total + ' results'; }, 1400);
    });
  }

  /* ---------------- Clear all ---------------- */
  var clear = document.querySelector('.filters__clear');
  if (clear) {
    clear.addEventListener('click', function () {
      if (chips) chips.innerHTML = '';
      Array.prototype.forEach.call(document.querySelectorAll('.size-btn'), function (b) {
        b.setAttribute('aria-pressed', 'false');
      });
      total = 128;
      updateCount();
    });
  }
}());
