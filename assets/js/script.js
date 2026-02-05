document.addEventListener('DOMContentLoaded', () => {

    /* ================= CART LOGIC ================= */

    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const itemsContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const badgeEl = document.getElementById('cart-badge');

    const menuBtn = document.getElementById('menu-btn');

    menuBtn.addEventListener('click', () => {
        toggleMobileMenu();
    });

    let cartItems = [
        {
            id: 1,
            name: 'Stone-ground Chakki Aata',
            price: 350,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=100&h=100'
        },
        {
            id: 2,
            name: 'Pure Lakadong Haldi',
            price: 150,
            quantity: 1,
            image: 'https://m.media-amazon.com/images/I/616DUzGIh1L.jpg'
        }
    ];

    window.updateQuantity = function (id, delta) {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;

        item.quantity += delta;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(i => i.id !== id);
        }
        renderCart();
    };

    function toggleCart(open) {
        cartSidebar.classList.toggle('translate-x-full', !open);
        cartSidebar.classList.toggle('translate-x-0', open);

        cartOverlay.classList.toggle('opacity-0', !open);
        cartOverlay.classList.toggle('pointer-events-none', !open);
        cartOverlay.classList.toggle('opacity-100', open);
    }

    function renderCart() {
        itemsContainer.innerHTML = '';
        let subtotal = 0;
        let count = 0;

        if (!cartItems.length) {
            itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-48 text-earthy_green">
          <span class="material-symbols-outlined text-5xl opacity-20">shopping_cart_off</span>
          <p class="text-sm font-medium">Your cart is empty</p>
        </div>`;
        }

        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
            count += item.quantity;

            itemsContainer.insertAdjacentHTML('beforeend', `
        <div class="flex gap-4 py-4 border-b border-earthy_green/10">
          <img src="${item.image}" class="h-20 w-20 rounded-lg object-cover" />
          <div class="flex-1">
            <h3 class="text-sm font-bold">${item.name}</h3>
            <p class="text-xs">₹${item.price} / unit</p>
            <div class="flex items-center gap-3 mt-2">
              <button onclick="updateQuantity(${item.id}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity(${item.id}, 1)">+</button>
              <span class="ml-auto font-bold">₹${item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      `);
        });

        subtotalEl.textContent = `₹${subtotal}`;
        totalEl.textContent = `₹${subtotal}`;
        badgeEl.textContent = count;
        badgeEl.style.display = count ? 'flex' : 'none';
    }

    openCartBtn?.addEventListener('click', () => toggleCart(true));
    closeCartBtn?.addEventListener('click', () => toggleCart(false));
    cartOverlay?.addEventListener('click', () => toggleCart(false));

    renderCart();


    /* ================= MOBILE MENU ================= */

    window.toggleMobileMenu = function () {
        const menu = document.getElementById('mobile-menu');
        if (!menu) return;

        const isOpen = !menu.classList.contains('hidden');

        if (isOpen) {
            menu.classList.add('opacity-0');
            setTimeout(() => menu.classList.add('hidden'), 200);
            document.body.style.overflow = 'auto';
        } else {
            menu.classList.remove('hidden');
            setTimeout(() => menu.classList.remove('opacity-0'), 10);
            document.body.style.overflow = 'hidden';
        }
    };


    /* ================= CONTACT MODAL ================= */

    const modal = document.getElementById('contactModal');
    const modalTriggers = document.querySelectorAll('[data-contact-open]');
    const modalClose = document.querySelector('[data-contact-close]');

    function toggleModal(open) {
        modal.classList.toggle('hidden', !open);
        modal.classList.toggle('flex', open);
        document.body.style.overflow = open ? 'hidden' : 'auto';
    }

    modalTriggers.forEach(btn =>
        btn.addEventListener('click', e => {
            e.preventDefault();
            toggleModal(true);
        })
    );

    modalClose?.addEventListener('click', () => toggleModal(false));
    modal?.addEventListener('click', e => {
        if (e.target === modal) toggleModal(false);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') toggleModal(false);
    });

});
