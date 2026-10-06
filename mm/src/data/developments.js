export const DEVELOPMENTS = [
    {
        id: "victory-park",
        name: "Victory Park Resort",
        location: "Gwarinpa Extension, Abuja",
        desc: "A premium residential estate designed for comfort, security, and modern living — featuring recreational areas, schools, shopping facilities, and landscaped surroundings.",
        types: ["Sansiro Emirate Maisonette — 500 SQM", "Etihad Fully Detached Duplex — 400 SQM", "Ferragamo Terrace Duplex — 250 SQM"],
        tag: "Abuja",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    {
        id: "ami-residence-kubwa",
        name: "AMI Residence",
        location: "Kubwa, Abuja",
        desc: "A thoughtfully planned gated community featuring contemporary homes, landscaped greenery, private driveways, and palm-lined roads for serene modern living.",
        types: ["Semi Detached Duplex — 250 SQM", "Fully Detached Duplex — 500 SQM"],
        tag: "Abuja",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    },
    {
        id: "ami-residence-kano",
        name: "AMI Residence",
        location: "Bompai, Kano",
        desc: "A boutique residential development on President Avenue, Bompai — designed for modern comfort with spacious apartments, quality finishes, and natural ventilation.",
        types: ["3 Bedroom Apartment Flats"],
        tag: "Kano",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
];

export const PUBLIC_PROPERTIES = DEVELOPMENTS.map((project) => ({
    ...project,
    title: project.name,
    description: `${project.desc}\n\nProperty options: ${project.types.join("; ")}. Contact our team to confirm current availability and pricing.`,
    type: project.id === "ami-residence-kano" ? "apartment" : "house",
    status: "sale",
    price: null,
    images: [project.image],
}));
