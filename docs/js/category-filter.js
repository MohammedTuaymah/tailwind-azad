document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryProducts = document.querySelectorAll('.category-product');

    // Function to handle category filtering
    const filterProducts = (category) => {
        categoryProducts.forEach(product => {
            const productCategory = product.dataset.category;
            
            if (category === 'all' || category === productCategory) {
                // Show product with fade-in animation
                product.style.display = 'block';
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 50);
            } else {
                // Hide product
                product.style.display = 'none';
            }
        });
    };

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-amber-900', 'text-white');
                btn.classList.add('bg-white');
            });

            // Add active class to clicked button
            button.classList.add('active', 'bg-amber-900', 'text-white');
            button.classList.remove('bg-white');

            // Filter products based on selected category
            const selectedCategory = button.dataset.category;
            filterProducts(selectedCategory);
        });
    });

    // Add smooth transitions for products
    categoryProducts.forEach(product => {
        product.style.transition = 'opacity 0.3s ease-in-out';
    });
}); 