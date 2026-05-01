// Sidebar toggle functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarContent = document.querySelector('.sidebar-content');

    if (sidebarToggle && sidebarContent) {
        sidebarToggle.addEventListener('click', function() {
            sidebarContent.classList.toggle('active');

            // Update toggle button text
            if (sidebarContent.classList.contains('active')) {
                sidebarToggle.textContent = 'Hide Navigation';
            } else {
                sidebarToggle.textContent = 'Show Navigation';
            }
        });
    }

    // Set active state for current page in sidebar
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    sidebarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        // Check if the current page matches the link
        if (currentPath.endsWith(linkPath) ||
            (currentPath.endsWith('/') && linkPath === 'index.html') ||
            (currentPath.endsWith('/angular-awesome/') && linkPath === 'index.html')) {
            link.classList.add('active');

            // If it's a child link, make sure parent sections are visible
            const parentLi = link.closest('li').parentElement.closest('li');
            if (parentLi) {
                const parentSection = parentLi.querySelector('.sidebar-section');
                if (parentSection) {
                    parentSection.classList.add('active');
                }
            }
        }
    });

    // Component search functionality
    const componentSearch = document.getElementById('componentSearch');
    if (componentSearch) {
        componentSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.component-card');

            cards.forEach(function(card) {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Category filtering on components page
    const categoryButtons = document.querySelectorAll('.category-button');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                document.querySelectorAll('.category-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');

                const category = this.getAttribute('data-category');
                const cards = document.querySelectorAll('.component-card');

                cards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
