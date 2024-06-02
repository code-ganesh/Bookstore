const books = [
    {
        title: "Book Title 1",
        author: "Author Name 1",
        price: 9.99,
        description: "Brief description of the book.",
        category: "fiction",
        image: "images/book4.jpg"
    },
    {
        title: "Book Title 2",
        author: "Author Name 2",
        price: 12.99,
        description: "Brief description of the book.",
        category: "non-fiction",
        image: "images/book2.jpg"
    },
    {
        title: "Book Title 3",
        author: "Author Name 3",
        price: 8.99,
        description: "Brief description of the book.",
        category: "mystery",
        image: "images/book3.jpg"
    },
    {
        title: "Book Title 3",
        author: "Author Name 3",
        price: 8.99,
        description: "Brief description of the book.",
        category: "fiction",
        image: "images/book5.jpg"
    },
    {
        title: "Book Title 3",
        author: "Author Name 3",
        price: 8.99,
        description: "Brief description of the book.",
        category: "non-fiction",
        image: "images/book9.jpg"
    },
    {
        title: "Book Title 3",
        author: "Author Name 3",
        price: 8.99,
        description: "Brief description of the book.",
        category: "fantasy",
        image: "images/book6.jpg"
    },
];

function renderBooks(filteredBooks) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookCard = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${book.image}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Price: $${book.price.toFixed(2)}</p>
                        <p class="card-text">${book.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary view-details">View Details</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary add-to-cart" data-book='${JSON.stringify(book)}'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        bookList.innerHTML += bookCard;
    });

    // Add to Cart button event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const book = JSON.parse(this.dataset.book);
            addToCart(book);
        });
    });
}

function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingBook = cart.find(item => item.title === book.title);

    if (existingBook) {
        existingBook.quantity += 1;
    } else {
        book.quantity = 1;
        cart.push(book);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';

    cart.forEach(book => {
        const totalPrice = (book.price * book.quantity).toFixed(2);
        const cartItem = `
            <tr>
                <td>${book.title}</td>
                <td>$${book.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary decrement" data-title="${book.title}">-</button>
                    <span>${book.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary increment" data-title="${book.title}">+</button>
                </td>
                <td>$${totalPrice}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger remove" data-title="${book.title}">Remove</button>
                </td>
            </tr>
        `;
        cartItems.innerHTML += cartItem;
    });

    // Total Price Calculation
    const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0).toFixed(2);
    document.getElementById('total-price').textContent = `$${totalPrice}`;

    // Event listeners for increment, decrement, and remove buttons
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function() {
            updateCart(this.dataset.title, 1);
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function() {
            updateCart(this.dataset.title, -1);
        });
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(this.dataset.title);
        });
    });
}

function updateCart(title, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const book = cart.find(item => item.title === title);

    if (book) {
        book.quantity += change;
        if (book.quantity <= 0) {
            cart = cart.filter(item => item.title !== title);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeFromCart(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(book => book.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('book-list')) {
        renderBooks(books);
    }

    if (document.getElementById('cart-items')) {
        renderCart();
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm));
            renderBooks(filteredBooks);
        });
    }

    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            const selectedCategory = categoryFilter.value;
            const filteredBooks = selectedCategory ? books.filter(book => book.category === selectedCategory) : books;
            renderBooks(filteredBooks);
        });
    }

    document.getElementById('buy-now')?.addEventListener('click', function () {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        renderCart();
    });
});





document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('book-list')) {
        renderBooks(books);
    }

    if (document.getElementById('cart-items')) {
        renderCart();
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm));
            renderBooks(filteredBooks);
        });
    }

    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            const selectedCategory = categoryFilter.value;
            const filteredBooks = selectedCategory ? books.filter(book => book.category === selectedCategory) : books;
            renderBooks(filteredBooks);
        });
    }

    document.getElementById('buy-now')?.addEventListener('click', function () {
        alert('Thank you for your purchase!');
        localStorage.removeItem('cart');
        renderCart();
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            // Display a simple alert for demonstration purposes
            alert(`Thank you for contacting us, ${name}! We will respond to your message at ${email}.`);

            // Clear the form
            contactForm.reset();

            // Close the modal
            $('#contactModal').modal('hide');
        });
    }
});

