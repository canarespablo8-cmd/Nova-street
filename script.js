/* ==========================================
   NØVA STREET
   JAVASCRIPT
========================================== */


/* ==========================================
   VARIABLES
========================================== */

const cart = [];

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const toast =
    document.getElementById("toast");


/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});


document.querySelectorAll(".nav a")
.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* ==========================================
   SEARCH
========================================== */

const searchBtn =
    document.getElementById("searchBtn");

const searchPanel =
    document.getElementById("searchPanel");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (
        searchPanel.classList.contains("active")
    ) {

        searchInput.focus();

    }

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

});


/* ==========================================
   PRODUCT SEARCH
========================================== */

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
            .toLowerCase()
            .trim();

        const products =
            document.querySelectorAll(
                ".product-card"
            );

        products.forEach(product => {

            const name =
                product.dataset.name
                .toLowerCase();

            if (name.includes(search)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    }
);


/* ==========================================
   FILTERS
========================================== */

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        filter.classList.add("active");

        const category =
            filter.dataset.category;

        const products =
            document.querySelectorAll(
                ".product-card"
            );

        products.forEach(product => {

            if (
                category === "todos" ||
                product.dataset.category === category
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* ==========================================
   OPEN CART
========================================== */

cartBtn.addEventListener("click", () => {

    openCart();

});


function openCart() {

    cartElement.classList.add("active");

    overlay.classList.add("active");

}


/* ==========================================
   CLOSE CART
========================================== */

closeCart.addEventListener(
    "click",
    closeCartPanel
);

overlay.addEventListener(
    "click",
    closeCartPanel
);


function closeCartPanel() {

    cartElement.classList.remove("active");

    overlay.classList.remove("active");

}


/* ==========================================
   ADD PRODUCTS
========================================== */

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);

        addToCart(name, price);

    });

});


function addToCart(name, price) {

    const existing =
        cart.find(
            item => item.name === name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    showToast();

    openCart();

}


/* ==========================================
   UPDATE CART
========================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>🛒</span>

                <p>
                    Tu carrito está vacío.
                </p>

            </div>

        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;

    }


    let total = 0;

    let quantity = 0;


    cart.forEach((item, index) => {

        total +=
            item.price *
            item.quantity;

        quantity +=
            item.quantity;


        const product =
            document.createElement("div");

        product.className =
            "cart-product";


        product.innerHTML = `

            <div class="cart-product-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.quantity}
                    ×
                    $${item.price.toFixed(2)}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ELIMINAR
            </button>

        `;


        cartItems.appendChild(product);

    });


    cartCount.textContent =
        quantity;

    cartTotal.textContent =
        `$${total.toFixed(2)}`;


    /* REMOVE BUTTONS */

    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart.splice(index, 1);

                    updateCart();

                }
            );

        });

}


/* ==========================================
   TOAST
========================================== */

function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const email =
            newsletterForm
            .querySelector("input")
            .value;


        if (!email) {
            return;
        }


        alert(
            "¡Gracias por unirte a NØVA STREET!"
        );


        newsletterForm.reset();

    }
);


/* ==========================================
   CHECKOUT
========================================== */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        alert(
            "¡Gracias por tu compra! " +
            "El sistema de pago se conectará próximamente."
        );

    }
);


/* ==========================================
   QUICK VIEW
========================================== */

const quickViewButtons =
    document.querySelectorAll(
        ".quick-view"
    );


quickViewButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const card =
                button.closest(
                    ".product-card"
                );

            const name =
                card.dataset.name;

            const price =
                card.querySelector(
                    ".product-info strong"
                ).textContent;


            alert(
                `${name}\n\nPrecio: ${price}\n\n` +
                `Esta es una vista rápida del producto.`
            );

        }
    );

});


/* ==========================================
   SCROLL ANIMATION
========================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(
        ".product-card, .category"
    )
    .forEach(element => {

        element.classList.add(
            "scroll-element"
        );

        observer.observe(element);

    });


/* ==========================================
   INITIALIZE
========================================== */

updateCart();
