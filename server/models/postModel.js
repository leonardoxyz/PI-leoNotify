const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const postSchema = new Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: [
            'Uncategorized', 'General', 'News', 'Technology', 'Entertainment',
            'Music', 'Movies', 'Gaming', 'Sports', 'Health', 'Science', 'Travel',
            'Food', 'Education', 'Fashion', 'Books', 'Art', 'Design', 'Photography',
            'Lifestyle', 'Fitness', 'Cars', 'Animals', 'Nature', 'Humor', 'DIY',
            'Advice', 'Relationships', 'Parenting', 'Spirituality', 'Religion',
            'Philosophy', 'Politics', 'History', 'Psychology', 'Writing', 'Poetry',
            'True Stories', 'Short Stories', 'Fan Fiction', 'Erotica', 'Thriller',
            'Mystery', 'Horror', 'Fantasy', 'Science Fiction', 'Romance', 'Teen Fiction',
            'Adventure', 'Action', 'Children', 'Comics', 'Manga', 'Graphic Novels',
            'Classics', 'Literature', 'Contemporary', 'Historical', 'Urban', 'Paranormal',
            'Young Adult', 'Chick Lit', 'Suspense', 'Dystopian', 'Self Help', 'Motivational',
            'Spiritual', 'Cookbooks', 'Biographies', 'Math', 'Physics', 'Chemistry', 'Biology',
            'Astronomy', 'Geology', 'Engineering', 'Economics', 'Business', 'Marketing',
            'Management', 'Leadership', 'Public Relations', 'Advertising', 'Sales', 'Finance',
            'Investing', 'Stocks', 'Real Estate', 'Personal Finance', 'Budgeting', 'Retirement',
            'Taxes', 'Insurance', 'Credit', 'Debt', 'Banking', 'Cryptocurrency', 'Blockchain',
            'Startups', 'Venture Capital', 'Angel Investing'
        ],
        message: "{VALUE IS NOT SUPPORTED}"
    },
    desc: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: String, required: true },
    comments: [commentSchema], 
}, { timestamps: true });

module.exports = model('Post', postSchema);