require('dotenv').config();

// Fallback events if database is not set or fails
const fallbackEvents = [
    {
        id: "event-1",
        name: "The First Orbit",
        date: "friday, 8:00 pm",
        location: "gulberg, lahore",
        price: "2,500 PKR",
        status: "OPEN",
        description: "our inaugural meetup. no pressure, no rigid structure. just good people, a comfortable environment, and some light icebreakers to get the conversation flowing.",
        timeline: [
            { time: "8:00 pm", desc: "doors open. grab a coffee." },
            { time: "8:30 pm", desc: "low-stakes icebreakers." },
            { time: "9:30 pm", desc: "open mingling." },
            { time: "11:00 pm", desc: "wind down." }
        ],
        link: "about:blank"
    },
    {
        id: "event-2",
        name: "Game Night",
        date: "saturday, 7:00 pm",
        location: "dha phase 5, lahore",
        price: "3,000 PKR",
        status: "SOLD OUT",
        description: "board games, card games, and questionable strategies. whether you're a catan master or just here for the snacks, it's going to be a good time.",
        timeline: [
            { time: "7:00 pm", desc: "arrival & team drafting." },
            { time: "7:30 pm", desc: "games begin." },
            { time: "9:00 pm", desc: "pizza break." },
            { time: "10:30 pm", desc: "final rounds." }
        ],
        link: "about:blank"
    }
];

async function fetchEvents() {
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    if (!databaseId) {
        console.log("No NOTION_DATABASE_ID found in .env. Using fallback events.");
        return fallbackEvents;
    }

    try {
        console.log("Fetching events from Notion database...");
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            }
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Unknown API Error");
        }

        const data = await response.json();

        // Map Notion properties to our event structure
        const events = data.results.map((page, index) => {
            const props = page.properties;
            
            // Helper to get text from rich_text or title
            const getText = (prop) => {
                if (!prop) return "";
                if (prop.title && prop.title.length > 0) return prop.title[0].plain_text;
                if (prop.rich_text && prop.rich_text.length > 0) return prop.rich_text[0].plain_text;
                return "";
            };

            // Helper to get date
            const getDate = (prop) => {
                if (!prop || !prop.date || !prop.date.start) return "";
                return prop.date.start;
            };

            // Helper to get URL
            const getUrl = (prop) => {
                if (!prop || !prop.url) return "about:blank";
                return prop.url;
            };

            return {
                id: `event-${index + 1}`,
                name: getText(props.Name) || `Event ${index + 1}`,
                date: getDate(props.Date) || "TBD",
                location: getText(props.Location) || "TBD",
                price: getText(props.Price) || "FREE",
                status: "OPEN", 
                description: getText(props.Description) || "No description provided.",
                timeline: [], // Simple version does not fetch timeline for now
                link: getUrl(props.Link)
            };
        });

        if (events.length === 0) {
            console.log("Notion database is empty. Using fallback events.");
            return fallbackEvents;
        }

        console.log(`Successfully fetched ${events.length} events from Notion.`);
        return events;
    } catch (error) {
        console.error("Error fetching from Notion:", error.message);
        console.log("Falling back to default events.");
        return fallbackEvents;
    }
}

module.exports = { fetchEvents };
