/**
 * ==========================================================================
 * VERIGLOW COSMETICS - MASTER JAVASCRIPT
 * Xử lý Dữ liệu (Data), Mô hình đối tượng tài liệu (DOM) và Sự kiện (Events)
 * ==========================================================================
 */

// 1. CẤU TRÚC DỮ LIỆU SẢN PHẨM (DATA ARRAY)
const productsData = [
    {
        id: '01',
        brand: "La Roche-Posay", //[cite: 1]
        brandCode: "laroche", 
        name: "Anthelios UVmune 400 Oil Control Gel-Cream", //[cite: 1]
        category: "Kem chống nắng kiềm dầu", //[cite: 1]
        capacity: "50ml", //[cite: 1]
        price: 450000, 
        displayPrice: "450.000 VNĐ", //[cite: 1]
        image: "images/sp-anthelios.jpg",
        badge: "HOT",
        rating: 4.5,
        isBestseller: true
    },
    {
        id: '02',
        brand: "La Roche-Posay", //[cite: 1]
        brandCode: "laroche",
        name: "Cicaplast Baume B5+", //[cite: 1]
        category: "Kem dưỡng phục hồi", //[cite: 1]
        capacity: "40ml", //[cite: 1]
        price: 330000,
        displayPrice: "330.000 VNĐ", //[cite: 1]
        image: "images/sp-laroche-b5.jpg",
        badge: "Phục Hồi",
        rating: 5,
        isBestseller: false
    },
    {
        id: '11',
        brand: "Cocoon", //[cite: 1]
        brandCode: "cocoon",
        name: "Cà phê Đắk Lắk làm sạch da chết cơ thể", //[cite: 1]
        category: "Tẩy tế bào chết toàn thân", //[cite: 1]
        capacity: "200ml", //[cite: 1]
        price: 125000,
        displayPrice: "125.000 VNĐ", //[cite: 1]
        image: "images/sp-cocoon-taydachet.jpg",
        badge: "Vegan",
        rating: 5,
        isBestseller: true
    },
    {
        id: '12',
        brand: "Cocoon", //[cite: 1]
        brandCode: "cocoon",
        name: "Nước dưỡng tóc tinh dầu bưởi", //[cite: 1]
        category: "Xịt dưỡng kích mọc tóc", //[cite: 1]
        capacity: "140ml", //[cite: 1]
        price: 135000,
        displayPrice: "135.000 VNĐ", //[cite: 1]
        image: "images/sp-cocoon-buoi.jpg",
        badge: "Mới",
        rating: 4.5,
        isBestseller: false
    },
    {
        id: '31',
        brand: "Paula’s Choice", //[cite: 1]
        brandCode: "paula",
        name: "Skin Perfecting 2% BHA Liquid Exfoliant", //[cite: 1]
        category: "Tẩy tế bào chết hóa học", //[cite: 1]
        capacity: "118ml", //[cite: 1]
        price: 850000,
        displayPrice: "850.000 VNĐ", //[cite: 1]
        image: "images/sp-paula-bha.jpg",
        badge: "Premium",
        rating: 5,
        isBestseller: true
    },
    {
        id: '26',
        brand: "Bioderma", //[cite: 1]
        brandCode: "bioderma",
        name: "Sensibio H2O (Nắp hồng)", //[cite: 1]
        category: "Nước tẩy trang", //[cite: 1]
        capacity: "500ml", //[cite: 1]
        price: 420000,
        displayPrice: "420.000 VNĐ", //[cite: 1]
        image: "images/sp-bioderma-hong.jpg",
        badge: "Best",
        rating: 4,
        isBestseller: true
    }
];

// 2. KHỞI TẠO GIỎ HÀNG TỪ BỘ NHỚ TRÌNH DUYỆT (LOCAL STORAGE)
// Nếu người dùng mới vào, giỏ hàng sẽ là mảng rỗng []
let cart = JSON.parse(localStorage.getItem('veriglow_cart')) || [];

/**
 * Hàm lưu giỏ hàng vào trình duyệt và cập nhật giao diện
 */
function saveCart() {
    localStorage.setItem('veriglow_cart', JSON.stringify(cart));
    updateCartUI();
}


// 3. HÀM KẾT XUẤT GIAO DIỆN (RENDER FUNCTIONS)

/**
 * Hàm tạo HTML cho 1 Thẻ sản phẩm (Product Card)
 */
function createProductHTML(product) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(product.rating)) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }

    const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';

    return `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 animate__animated animate__fadeIn">
            <div class="product-card">
                ${badgeHTML}
                <div class="product-img-wrap">
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <div class="product-actions">
                        <button class="action-btn" title="Yêu thích" onclick="toggleHeart(this)"><i class="far fa-heart"></i></button>
                        <button class="action-btn" title="Thêm giỏ hàng" onclick="addToCart('${product.id}')"><i class="fas fa-shopping-cart"></i></button>
                        <a href="product-detail.html?id=${product.id}" class="action-btn" title="Xem nhanh"><i class="fas fa-eye"></i></a>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand}</span>
                    <a href="product-detail.html?id=${product.id}" class="product-title" title="${product.name}">${product.name}</a>
                    <div class="d-flex align-items-center mb-2">
                        <div class="text-warning small me-2">${starsHTML}</div>
                    </div>
                    <p class="text-muted small mb-3">${product.category} - ${product.capacity}</p>
                    <div class="product-price">${product.displayPrice}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Hàm hiển thị sản phẩm vào các Tabs trên Trang chủ
 */
function renderProductsToTabs() {
    const bestsellerProducts = productsData.filter(p => p.isBestseller);
    const larocheProducts = productsData.filter(p => p.brandCode === 'laroche');
    const cocoonProducts = productsData.filter(p => p.brandCode === 'cocoon');
    const paulaProducts = productsData.filter(p => p.brandCode === 'paula');

    const injectHTML = (selector, data) => {
        const container = document.querySelector(selector);
        if (container) {
            container.innerHTML = data.map(product => createProductHTML(product)).join('');
        }
    };

    injectHTML('#tab-bestseller .row', bestsellerProducts);
    injectHTML('#tab-laroche .row', larocheProducts);
    injectHTML('#tab-cocoon .row', cocoonProducts);
    injectHTML('#tab-paula .row', paulaProducts);
}


// 4. LOGIC GIỎ HÀNG (CART LOGIC)

/**
 * Hàm Thêm vào giỏ hàng
 */
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(); 

    // Tự động mở Modal Giỏ hàng để thông báo thành công
    const cartModalEl = document.getElementById('cartModal');
    if (cartModalEl) {
        const cartModal = bootstrap.Modal.getOrCreateInstance(cartModalEl);
        cartModal.show();
    }
}

/**
 * Hàm Xóa sản phẩm khỏi giỏ hàng
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

/**
 * Hàm Tăng/Giảm số lượng
 */
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Xóa luôn nếu giảm về 0
        } else {
            saveCart();
        }
    }
}

/**
 * Hàm Cập nhật toàn bộ giao diện Giỏ hàng
 */
function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const headerCount = document.getElementById('cart-header-count');
    const cartBody = document.getElementById('cart-body-content');
    const totalPriceEl = document.getElementById('cart-total-price');

    // Tính tổng số lượng
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Cập nhật số lượng trên Menu
    if (badge) {
        badge.innerText = totalItems;
        // Reset animation để hiệu ứng nảy lặp lại mỗi khi thêm hàng
        badge.classList.remove('animate__bounceIn');
        void badge.offsetWidth; 
        badge.classList.add('animate__bounceIn');
    }
    if (headerCount) headerCount.innerText = totalItems;

    if (!cartBody) return;

    // HIỂN THỊ KHI GIỎ HÀNG RỖNG
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="fas fa-shopping-basket fa-4x mb-3" style="color: var(--vg-pink-light);"></i>
                <h6 class="fw-bold text-dark">Giỏ hàng của bạn đang trống</h6>
                <p class="small">Hãy khám phá thêm các sản phẩm tuyệt vời nhé!</p>
                <button class="btn btn-outline-veriglow mt-3" data-bs-dismiss="modal">Tiếp tục mua sắm</button>
            </div>
        `;
        if (totalPriceEl) totalPriceEl.innerText = '0đ';
        return;
    }

    // HIỂN THỊ KHI CÓ SẢN PHẨM
    let cartHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `
            <div class="d-flex align-items-center mb-4 border-bottom pb-3 animate__animated animate__fadeIn">
                <img src="${item.image}" class="rounded border" width="70" alt="${item.name}">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-1 text-dark fw-bold" style="font-size: 0.9rem;">
                        <a href="product-detail.html?id=${item.id}" class="text-dark">${item.name}</a>
                    </h6>
                    <div class="text-muted small mb-2">${item.brand} | ${item.capacity}</div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-pink-dark fw-bold">${itemTotal.toLocaleString('vi-VN')}đ</span>
                        <div class="input-group input-group-sm w-auto">
                            <button class="btn btn-outline-secondary px-2 fw-bold" type="button" onclick="changeQuantity('${item.id}', -1)">-</button>
                            <input type="text" class="form-control text-center bg-white" value="${item.quantity}" style="max-width: 40px;" readonly>
                            <button class="btn btn-outline-secondary px-2 fw-bold" type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                </div>
                <button class="btn btn-link text-danger p-0 ms-2" onclick="removeFromCart('${item.id}')" title="Xóa">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });

    cartBody.innerHTML = cartHTML;
    if (totalPriceEl) {
        totalPriceEl.innerText = totalPrice.toLocaleString('vi-VN') + 'đ'; 
    }
}

/**
 * Hàm Xử lý nút Thanh toán
 */
function processCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Hãy thêm sản phẩm trước khi thanh toán.");
        return;
    }
    
    // Giả lập luồng thanh toán
    const confirmCheckout = confirm("Bạn có chắc chắn muốn chuyển đến trang thanh toán an toàn?");
    if (confirmCheckout) {
        alert("Cảm ơn bạn! Đơn hàng của bạn đang được chuyển đến hệ thống Veriglow.");
        // Chuyển hướng khi có trang thực tế
        // window.location.href = 'checkout.html';
    }
}


// 5. CÁC TƯƠNG TÁC GIAO DIỆN KHÁC (UI INTERACTIONS)

/**
 * Hàm Đổi trạng thái Yêu thích (Trái tim)
 */
function toggleHeart(buttonEl) {
    const icon = buttonEl.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        icon.classList.add('text-pink-dark', 'animate__animated', 'animate__heartBeat');
    } else {
        icon.classList.replace('fas', 'far');
        icon.classList.remove('text-pink-dark', 'animate__animated', 'animate__heartBeat');
    }
}

/**
 * Hàm Xử lý form tìm kiếm
 */
function initSearchForm() {
    const searchForm = document.querySelector('#searchModal form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const query = this.querySelector('input[name="q"]').value;
            if (query.trim() !== "") {
                window.location.href = `products.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}


// 6. KHỞI TẠO HỆ THỐNG (SYSTEM INITIALIZATION)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Tự động bơm dữ liệu sản phẩm vào HTML
    renderProductsToTabs();
    
    // 2. Khởi tạo Giỏ hàng (Đọc từ LocalStorage & cập nhật hiển thị)
    updateCartUI();

    // 3. Khởi tạo form Tìm kiếm
    initSearchForm();

    // 4. Hiệu ứng thanh menu dính (Sticky Navbar)
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
                navbar.style.padding = '10px 0'; 
            } else {
                navbar.classList.remove('shadow');
                navbar.style.padding = '15px 0'; 
            }
        });
    }
});