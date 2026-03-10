// 1. DANH SÁCH TOÀN BỘ MÓN ĂN 
const products = [
    // Burger
    { id: 'b1', name: 'Cheese Burger', price: 65000, img: 'assets/images/cheese-burger.png' },
    { id: 'b2', name: 'Classic Burger', price: 55000, img: 'assets/images/classic-burger.png' },
    { id: 'b3', name: 'Chicken Burger', price: 50000, img: 'assets/images/chicken-burger.png' },
    // Pizza
    { id: 'p1', name: 'Pepperoni Pizza', price: 120000, img: 'assets/images/pepperoni-pizza.png' },
    { id: 'p2', name: 'Hawaiian Pizza', price: 110000, img: 'assets/images/hawaiian-pizza.png' },
    { id: 'p3', name: 'Veggie Pizza', price: 100000, img: 'assets/images/veggie-pizza.png' },
    // Gà rán
    { id: 'c1', name: 'Gà Rán (2 miếng)', price: 45000, img: 'assets/images/ga-2-mieng.png' },
    { id: 'c2', name: 'Gà Rán (4 miếng)', price: 85000, img: 'assets/images/ga-4-mieng.png' },
    { id: 'c3', name: 'Wings BBQ (6 miếng)', price: 60000, img: 'assets/images/wings-bbq.png' },
    // Đồ uống
    { id: 'd1', name: 'Coca Cola', price: 20000, img: 'assets/images/cocacola.png' },
    { id: 'd2', name: 'Pepsi', price: 20000, img: 'assets/images/pepsi.png' },
    { id: 'd3', name: 'Trà Đào', price: 35000, img: 'assets/images/tra-dao.png' },
    // Đồ ăn vặt
    { id: 's1', name: 'Khoai Tây Chiên', price: 30000, img: 'assets/images/khoai-tay-chien.png' },
    { id: 's2', name: 'Onion Rings', price: 35000, img: 'assets/images/onion-rings.png' },
    { id: 's3', name: 'Salad Caesar', price: 40000, img: 'assets/images/salad-caesar.png' },
    // Combo
    { id: 'cb1', name: 'Combo Gà Rán', price: 99000, img: 'assets/images/combo-chicken.png' },
    { id: 'cb2', name: 'Combo Gà BBQ', price: 109000, img: 'assets/images/combo-bbq.png' },
    { id: 'cb3', name: 'Combo Pizza', price: 145000, img: 'assets/images/combo-pizza.png' }
];

// 2. CÁC HÀM QUẢN LÝ GIỎ HÀNG 
function getCart() {
    const cart = localStorage.getItem('fauget_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('fauget_cart', JSON.stringify(cart));
}

// 3. HÀM THÊM MÓN VÀO GIỎ HÀNG 
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error("Không tìm thấy món ăn với ID:", productId);
        return;
    }

    let cart = getCart();
    
    let existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// 4. HÀM CẬP NHẬT SỐ LƯỢNG HIỂN THỊ TRÊN ICON GIỎ HÀNG
function updateCartCount() {
    const cart = getCart();
    const cartBadge = document.getElementById('cart-badge');
    
    if (cartBadge) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'inline-block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// 5. CÁC HÀM TIỆN ÍCH HỖ TRỢ
// Định dạng tiền tệ VNĐ (ví dụ: 65000 -> 65.000đ)
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

// Hàm hiển thị thông báo góc màn hình 
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#4caf50', 
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        zIndex: '9999',
        transition: 'opacity 0.3s, transform 0.3s',
        transform: 'translateY(100px)',
        opacity: '0'
    });

    document.body.appendChild(toast);

    // Hiệu ứng hiện lên
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);

    // Tự động tắt sau 2.5 giây
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300); 
    }, 2500);
}

// 6. CHẠY KHI TRANG VỪA TẢI XONG
document.addEventListener('DOMContentLoaded', () => {
    // Tự động cập nhật số lượng giỏ hàng trên Header mỗi khi chuyển trang
    updateCartCount();
});

// --- CHỨC NĂNG TÌM KIẾM MÓN ĂN ---
function searchFood() {
    let keyword = document.getElementById('searchInput').value.toLowerCase();
    
    let productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        let foodName = card.querySelector('h3').innerText.toLowerCase();
        
        if (foodName.includes(keyword)) {
            card.style.display = 'block'; 
        } 
        
        else {
            card.style.display = 'none';
        }
    });
}

// --- CHỨC NĂNG MỞ BẢNG CHI TIẾT MÓN ĂN ---
function openModal(id) {
    let food = products.find(item => item.id === id);
    if (food) {
        document.getElementById('modalTitle').innerText = food.name;
        document.getElementById('modalPrice').innerText = food.price.toLocaleString('vi-VN') + 'đ';
        document.getElementById('modalImage').src = food.img; 
        
        let moTa = food.desc ? food.desc : "Được chế biến từ nguyên liệu tươi sạch 100%, công thức độc quyền từ Fauget mang đến hương vị bùng nổ. Ăn là ghiền, mua là mê!";
        document.getElementById('modalDesc').innerText = moTa;
        
        document.getElementById('modalAddToCart').setAttribute('onclick', `addToCart('${food.id}')`);
        document.getElementById('foodModal').style.display = 'flex';
    }
}
// Hàm đóng bảng
function closeModal() {
    document.getElementById('foodModal').style.display = 'none';
}

window.onclick = function(event) {
    let modal = document.getElementById('foodModal');
    if (event.target == modal) {
        closeModal();
    }
}