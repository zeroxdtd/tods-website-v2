// Simulated Database using LocalStorage for persistence
const DB_KEY = 'tods_db_2';

const initialData = {
    currentUser: null, // "admin" | "user" | null
    users: [
        { id: 1, role: 'admin', name: 'Master Admin' },
        { id: 2, role: 'user', name: 'Normal User' }
    ],
    content: {
        intro: "Empowering Telugu-speaking cybersecurity professionals through knowledge sharing, skill development, and community collaboration.",
        marquee: "🚀 JOIN THE TODS COMMUNITY TODAY! • UPCOMING EVENT: BEACON 2026 •"
    },
    hackers: [
        { id: 1, name: 'Alice Sec', category: 'purple', status: 'approved' },
        { id: 2, name: 'Bob RedTeam', category: 'red', status: 'approved' },
        { id: 3, name: 'Charlie Blue', category: 'blue', status: 'pending' }
    ],
    events: [
        { id: 1, title: 'Beacon 2026 CTF', date: '2026-10-15', status: 'upcoming' },
        { id: 2, title: 'Web Sec Workshop', date: '2026-02-10', status: 'completed' }
    ],
    blogs: [
        { id: 1, title: 'Intro to Buffer Overflows', author: 'Alice Sec', status: 'approved', content: 'A deep dive into stack smashing.' },
        { id: 2, title: 'Securing React Apps', author: 'Bob RedTeam', status: 'pending', content: 'Draft content on XSS.' }
    ],
    sponsors: [
        { id: 1, name: 'OffSec', tier: 'Gold' },
        { id: 2, name: 'TryHackMe', tier: 'Silver' }
    ],
    coreTeam: [
        {
            id: 1,
            name: 'Daniel T',
            pronouns: '(he/him)',
            role: 'Founder, TODS Community',
            image: 'https://placehold.co/400x400/9cd5fa/000000?text=Dhanush',
            linkedin: 'https://www.linkedin.com/in/danielthotapalli/'
        },
        {
            id: 2,
            name: 'Srihaas Tammareddy',
            pronouns: '(he/him)',
            role: 'Founding Member',
            image: 'https://placehold.co/400x400/FFD23F/000000?text=Jane',
            linkedin: 'https://www.linkedin.com/in/srihaas-tammareddy/'
        },
        // {
        //     id: 3,
        //     name: 'Alex Rivera',
        //     pronouns: '(they/them)',
        //     role: 'Lead Architect',
        //     image: 'https://placehold.co/400x400/FF7B54/000000?text=Alex',
        //     linkedin: 'https://linkedin.com/'
        // }
    ],
    testimonials: [
        { id: 1, name: 'Alex H.', text: 'Best community for Telugu hackers!' }
    ]
};

// Initialize DB if empty
if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
}

// DB Interface
window.TODS_DB = {
    get: function () {
        return JSON.parse(localStorage.getItem(DB_KEY));
    },
    save: function (data) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        // Dispatch custom event so app knows data changed
        window.dispatchEvent(new Event('db_updated'));
    },
    updateContent: function (key, newValue) {
        let db = this.get();
        db.content[key] = newValue;
        this.save(db);
    },
    approveItem: function (type, id) {
        let db = this.get();
        const item = db[type].find(i => i.id === id);
        if (item) {
            item.status = 'approved';
            this.save(db);
        }
    },
    addCoreTeam: function (name, role) {
        let db = this.get();
        db.coreTeam.push({ id: Date.now(), name, role });
        this.save(db);
    },
    removeCoreTeam: function (id) {
        let db = this.get();
        db.coreTeam = db.coreTeam.filter(ct => ct.id !== id);
        this.save(db);
    },
    login: function (role) {
        let db = this.get();
        db.currentUser = role;
        this.save(db);
    },
    logout: function () {
        let db = this.get();
        db.currentUser = null;
        this.save(db);
    }
};
