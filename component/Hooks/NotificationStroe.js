const checkName = [
    { name: 'story_likes' }, { name: 'story_comments' }, { name: 'success_posts' },
    { name: 'article_likes' },
    { name: 'article_comments' }, { name: 'successful_articles' }, { name: 'followers' },
    { name: 'email_story_likes' }, { name: 'email_story_comments' }, { name: 'email_successful_posts' },
    { name: 'email_article_likes' }, { name: 'email_article_comments' }, { name: 'email_article_successfull' },
    { name: 'email_follower' }, { name: 'email_subscription' }, { name: 'email_following_alerts' },
]

export const NotificationsStore = () => {
    checkName.map(checkName => localStorage.setItem(checkName.name, true))
}