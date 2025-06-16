// Get all category filter buttons and product cards
const categoryFilters = document.querySelectorAll('.category-filter');
const productCards = document.querySelectorAll('.product-card');

// Add click event listeners to all category filter buttons
categoryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        categoryFilters.forEach(btn => btn.classList.remove('active', 'bg-amber-900', 'text-white'));
        btn.classList.add('bg-gray-100');

        // Add active class to clicked filter
        filter.classList.add('active', 'bg-amber-900', 'text-white');
        filter.classList.remove('bg-gray-100');

        const selectedCategory = filter.getAttribute('data-category');

        // Show/hide products based on selected category
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                card.style.display = 'block';
                // Add a fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
}); 