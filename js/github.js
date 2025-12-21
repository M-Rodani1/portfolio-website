// ============================================
// GitHub API Integration
// ============================================

const GITHUB_USERNAME = 'M-Rodani1';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours
const CACHE_KEY = 'github_stats_cache';

async function fetchGitHubStats() {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const data = JSON.parse(cached);
        const now = Date.now();
        if (now - data.timestamp < CACHE_DURATION) {
            return data.stats;
        }
    }
    
    try {
        // Fetch user info
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Fetch repos (sorted by updated)
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=all`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        // Get repos updated in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentRepos = reposData.filter(repo => {
            const updatedAt = new Date(repo.updated_at);
            return updatedAt > thirtyDaysAgo;
        });
        
        // Get featured repos (top 3 by stars or pinned)
        const featuredRepos = reposData
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3)
            .map(repo => ({
                name: repo.name,
                description: repo.description || 'No description',
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: repo.updated_at,
                language: repo.language,
                url: repo.html_url
            }));
        
        const stats = {
            publicRepos: userData.public_repos,
            followers: userData.followers,
            totalStars: totalStars,
            recentActivity: recentRepos.length,
            featuredRepos: featuredRepos
        };
        
        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            stats: stats
        }));
        
        return stats;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Return fallback data
        return {
            publicRepos: 7,
            followers: 7,
            totalStars: 0,
            recentActivity: 0,
            featuredRepos: []
        };
    }
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Updated today';
    if (diffInDays === 1) return 'Updated yesterday';
    if (diffInDays < 7) return `Updated ${diffInDays} days ago`;
    if (diffInDays < 30) return `Updated ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `Updated ${Math.floor(diffInDays / 30)} months ago`;
    return `Updated ${Math.floor(diffInDays / 365)} years ago`;
}

function renderGitHubStats(stats) {
    // Update metrics
    const repoCountEl = document.getElementById('github-repo-count');
    const followersEl = document.getElementById('github-followers-count');
    const starsEl = document.getElementById('github-stars-count');
    const activityEl = document.getElementById('github-activity-count');
    
    if (repoCountEl) repoCountEl.textContent = stats.publicRepos;
    if (followersEl) followersEl.textContent = stats.followers;
    if (starsEl) starsEl.textContent = stats.totalStars;
    if (activityEl) activityEl.textContent = stats.recentActivity;
    
    // Render featured repos
    const featuredContainer = document.getElementById('github-featured-repos');
    if (featuredContainer && stats.featuredRepos.length > 0) {
        featuredContainer.innerHTML = stats.featuredRepos.map(repo => `
            <a href="${repo.url}" target="_blank" class="featured-repo-card" rel="noopener noreferrer">
                <div class="repo-header">
                    <h4 class="repo-name">${repo.name}</h4>
                    ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
                </div>
                <p class="repo-description">${repo.description}</p>
                <div class="repo-stats">
                    <span class="repo-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.431 8.204 1.19-5.936 5.787 1.401 8.172-7.337-3.858-7.337 3.858 1.401-8.172-5.936-5.787 8.204-1.19z"/>
                        </svg>
                        ${repo.stars}
                    </span>
                    <span class="repo-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        ${repo.forks}
                    </span>
                    <span class="repo-updated">${formatRelativeTime(repo.updatedAt)}</span>
                </div>
            </a>
        `).join('');
    }
}

function showGitHubLoading() {
    const statsGrid = document.querySelector('.github-stats-grid');
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="github-stat-item">
                <div class="stat-number skeleton">...</div>
                <div class="stat-label">Loading...</div>
            </div>
            <div class="github-stat-item">
                <div class="stat-number skeleton">...</div>
                <div class="stat-label">Loading...</div>
            </div>
            <div class="github-stat-item">
                <div class="stat-number skeleton">...</div>
                <div class="stat-label">Loading...</div>
            </div>
            <div class="github-stat-item">
                <div class="stat-number skeleton">...</div>
                <div class="stat-label">Loading...</div>
            </div>
        `;
    }
}

// Initialize GitHub stats on page load
document.addEventListener('DOMContentLoaded', async function() {
    const githubSection = document.getElementById('github-stats');
    if (!githubSection) return;
    
    showGitHubLoading();
    
    try {
        const stats = await fetchGitHubStats();
        renderGitHubStats(stats);
    } catch (error) {
        console.error('Error initializing GitHub stats:', error);
        // Show fallback
        renderGitHubStats({
            publicRepos: 7,
            followers: 7,
            totalStars: 0,
            recentActivity: 0,
            featuredRepos: []
        });
    }
});

