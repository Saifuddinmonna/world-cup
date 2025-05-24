// Blog data structure
const blogPosts = [
    {
        id: 1,
        image: "images/Blog Image.png",
        category: "Transfer",
        title: "Breaking: Mbappé Makes Shocking Decision on Future",
        time: "2h",
        comments: 156,
        content: "In a stunning turn of events, Kylian Mbappé has announced his decision regarding his future. The French superstar has been the subject of intense speculation, with Real Madrid and PSG battling for his signature. Sources close to the player suggest a major announcement is imminent."
    },
    {
        id: 2,
        image: "images/Blog Image.png",
        category: "Match",
        title: "World Cup 2026: Host Cities Revealed",
        time: "5h",
        comments: 89,
        content: "FIFA has officially announced the 16 host cities for the 2026 World Cup. The tournament will be the first to feature 48 teams and will be spread across three countries. The selection process considered stadium capacity, infrastructure, and fan experience."
    },
    {
        id: 3,
        image: "images/Blog Image.png",
        category: "News",
        title: "Revolutionary VAR Changes Coming Next Season",
        time: "8h",
        comments: 234,
        content: "Major changes to the Video Assistant Referee (VAR) system are set to be implemented next season. The new system will include semi-automated offside technology and improved communication between referees and fans. These changes aim to reduce decision time and increase accuracy."
    },
    {
        id: 4,
        image: "images/Blog Image.png",
        category: "Transfer",
        title: "Premier League's Record-Breaking Transfer Window",
        time: "12h",
        comments: 178,
        content: "The Premier League has shattered its transfer spending record this summer, with clubs spending over £2 billion. Chelsea leads the spending with multiple high-profile signings, while other top clubs are also making significant investments in their squads."
    },
    {
        id: 5,
        image: "images/Blog Image.png",
        category: "Match",
        title: "Champions League Final: The Road to Istanbul",
        time: "3h",
        comments: 312,
        content: "The journey to the Champions League final in Istanbul is heating up. With the quarter-finals approaching, we analyze the remaining teams' chances and key players who could make the difference in the biggest club competition in world football."
    },
    {
        id: 6,
        image: "images/Blog Image.png",
        category: "News",
        title: "Football's Climate Action Plan Announced",
        time: "7h",
        comments: 92,
        content: "FIFA and major football organizations have unveiled a comprehensive climate action plan. The initiative includes carbon-neutral tournaments, sustainable stadiums, and eco-friendly travel arrangements. This marks a significant step towards making football more environmentally conscious."
    },
    {
        id: 7,
        image: "images/Blog Image.png",
        category: "Transfer",
        title: "South American Talent: The Next Generation",
        time: "4h",
        comments: 145,
        content: "A new wave of South American talent is taking European football by storm. From Brazil's latest wonderkid to Argentina's emerging stars, we profile the young players who are set to dominate world football in the coming years."
    },
    {
        id: 8,
        image: "images/Blog Image.png",
        category: "Match",
        title: "Women's World Cup: Tournament Preview",
        time: "6h",
        comments: 167,
        content: "With the Women's World Cup approaching, we take an in-depth look at the tournament favorites, dark horses, and players to watch. The competition promises to be the biggest and most competitive women's football tournament ever."
    },
    {
        id: 9,
        image: "images/Blog Image.png",
        category: "News",
        title: "Football's Digital Revolution",
        time: "9h",
        comments: 203,
        content: "From virtual reality training to AI-powered analytics, football is embracing technology like never before. We explore how these innovations are changing the game, from player development to fan engagement and match officiating."
    }
];

// Function to create blog post HTML
function createBlogPost(post) {
    return `
        <article class="blog-post" data-id="${post.id}">
            <div class="article-thumbnail">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="article-btn">
                <button>${post.category}</button>
            </div>
            <div class="paragraph">
                <p>${post.title}</p>
            </div>
            <div class="article-info">
                <p>
                    <i class="fa-regular fa-clock"></i> ${post.time} &nbsp &nbsp &nbsp 
                    <span><i class="fa-regular fa-message"></i> ${post.comments}</span>
                </p>
            </div>
            <div class="article-content" style="display: none;">
                <p>${post.content}</p>
            </div>
        </article>
    `;
}

// Function to load blog posts
function loadBlogPosts() {
    const articlesContainer = document.querySelector('.articles');
    if (!articlesContainer) return;

    // Clear existing content
    articlesContainer.innerHTML = '';

    // Add blog posts
    blogPosts.forEach(post => {
        articlesContainer.innerHTML += createBlogPost(post);
    });

    // Add click event listeners
    document.querySelectorAll('.blog-post').forEach(post => {
        post.addEventListener('click', function() {
            const content = this.querySelector('.article-content');
            const isExpanded = content.style.display === 'block';
            
            // Close all other expanded posts
            document.querySelectorAll('.article-content').forEach(c => {
                c.style.display = 'none';
                c.parentElement.classList.remove('expanded');
            });

            // Toggle current post
            if (!isExpanded) {
                content.style.display = 'block';
                this.classList.add('expanded');
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// Function to filter blog posts
function filterBlogPosts(category) {
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    
    const articlesContainer = document.querySelector('.articles');
    if (!articlesContainer) return;

    articlesContainer.innerHTML = '';
    filteredPosts.forEach(post => {
        articlesContainer.innerHTML += createBlogPost(post);
    });
}

// Function to search blog posts
function searchBlogPosts(query) {
    const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    );

    const articlesContainer = document.querySelector('.articles');
    if (!articlesContainer) return;

    articlesContainer.innerHTML = '';
    searchResults.forEach(post => {
        articlesContainer.innerHTML += createBlogPost(post);
    });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();

    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search blog posts...';
    searchInput.className = 'blog-search';
    searchInput.addEventListener('input', (e) => searchBlogPosts(e.target.value));

    const articlesContainer = document.querySelector('.articles');
    if (articlesContainer) {
        articlesContainer.parentElement.insertBefore(searchInput, articlesContainer);
    }

    // Add category filter buttons
    const categories = ['all', 'transfer', 'match', 'news'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'blog-filters';

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        button.className = 'filter-btn';
        button.addEventListener('click', () => filterBlogPosts(category));
        filterContainer.appendChild(button);
    });

    if (articlesContainer) {
        articlesContainer.parentElement.insertBefore(filterContainer, articlesContainer);
    }
}); 