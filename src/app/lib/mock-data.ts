import { getPetImageUrl } from "@/lib/utils";

export type PetStatus = "Available" | "Pending" | "Adopted";

export interface Pet {
  id: string;
  name: string;
  species: "Dog" | "Cat";
  breed: string;
  age: string;
  gender: string;
  size: string;
  location: string;
  description: string;
  personalityTraits: string[];
  likes: string[];
  dislikes: string[];
  status: PetStatus;
  imageUrl: string;
}

export interface Application {
  id: string;
  petId: string;
  petName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Reviewing" | "Approved" | "Rejected";
  submittedAt: string;
}

export const INITIAL_PETS: Pet[] = [
  {
    id: "1",
    name: "Luna",
    species: "Cat",
    breed: "Siamese Mix",
    age: "2 years",
    gender: "Female",
    size: "Small",
    location: "Downtown Shelter",
    description: "Luna is a gentle soul who loves watching birds through the window and curling up in warm spots. She's a Siamese mix with striking blue eyes and a soft, cream-colored coat.",
    personalityTraits: ["Cuddly", "Quiet", "Independent"],
    likes: ["Sunbathing", "Salmon treats", "String toys"],
    dislikes: ["Loud vacuums", "Cold floors"],
    status: "Available",
    imageUrl: getPetImageUrl("Cat", "Siamese Mix", "Luna")
  },
  {
    id: "2",
    name: "Cooper",
    species: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    size: "Large",
    location: "Suburban Rescue",
    description: "Cooper is the definition of a 'good boy'. He's energetic, friendly with everyone he meets, and always ready for an adventure. He loves the outdoors and needs an active family.",
    personalityTraits: ["Playful", "Loyal", "Energetic"],
    likes: ["Fetch", "Swimming", "Belly rubs"],
    dislikes: ["Being alone for too long"],
    status: "Available",
    imageUrl: getPetImageUrl("Dog", "Golden Retriever", "Cooper")
  },
  {
    id: "3",
    name: "Milo",
    species: "Cat",
    breed: "Maine Coon",
    age: "4 years",
    gender: "Male",
    size: "Large",
    location: "City Shelter",
    description: "Milo is a majestic Maine Coon with a heart as big as his paws. He's incredibly affectionate and enjoys being around people.",
    personalityTraits: ["Gentle Giant", "Affectionate", "Calm"],
    likes: ["Head scratches", "Large cat trees", "Grooming"],
    dislikes: ["Small spaces"],
    status: "Available",
    imageUrl: getPetImageUrl("Cat", "Maine Coon", "Milo")
  },
  {
    id: "4",
    name: "Bella",
    species: "Dog",
    breed: "Border Collie",
    age: "4 years",
    gender: "Female",
    size: "Medium",
    location: "Eastside Shelter",
    description: "Bella is a brilliant Border Collie mix who loves to learn new tricks. She thrives on mental stimulation and would excel in agility training or as a working companion.",
    personalityTraits: ["Smart", "Attentive", "Focused"],
    likes: ["Training", "Frisbee", "Long walks"],
    dislikes: ["Boredom"],
    status: "Available",
    imageUrl: getPetImageUrl("Dog", "Border Collie", "Bella")
  },
  {
    id: "5",
    name: "Oliver",
    species: "Cat",
    breed: "Tabby",
    age: "1 year",
    gender: "Male",
    size: "Medium",
    location: "Westside Shelter",
    description: "Oliver is a playful tabby who loves to chase laser pointers and fetch small toys. He's full of energy and very curious about his surroundings.",
    personalityTraits: ["Curious", "Playful", "Social"],
    likes: ["Laser pointers", "Catnip", "High perches"],
    dislikes: ["Rain", "Closed doors"],
    status: "Available",
    imageUrl: getPetImageUrl("Cat", "Tabby", "Oliver")
  },
  {
    id: "6",
    name: "Daisy",
    species: "Dog",
    breed: "Beagle",
    age: "5 years",
    gender: "Female",
    size: "Small",
    location: "Downtown Shelter",
    description: "Daisy is a sweet Beagle with an amazing nose. She's calm, patient, and loves a good sniff-walk in the park. She's great with kids and other dogs.",
    personalityTraits: ["Patient", "Gentle", "Scent-driven"],
    likes: ["Tracking scents", "Snuggling", "Car rides"],
    dislikes: ["Thunderstorms", "Being ignored"],
    status: "Available",
    imageUrl: getPetImageUrl("Dog", "Beagle", "Daisy")
  },
  {
    id: "7",
    name: "Snowball",
    species: "Cat",
    breed: "Persian",
    age: "3 years",
    gender: "Female",
    size: "Small",
    location: "City Shelter",
    description: "Snowball is as fluffy as her name suggests. She's a high-maintenance beauty who prefers a quiet home where she can be the center of attention.",
    personalityTraits: ["Regal", "Quiet", "Demanding"],
    likes: ["Premium food", "Being brushed", "Soft blankets"],
    dislikes: ["Dogs", "Loud music"],
    status: "Available",
    imageUrl: getPetImageUrl("Cat", "Persian", "Snowball")
  },
  {
    id: "8",
    name: "Rex",
    species: "Dog",
    breed: "Labrador",
    age: "2 years",
    gender: "Male",
    size: "Large",
    location: "Eastside Shelter",
    description: "Rex is a classic yellow lab with a heart of gold. He loves everyone he meets and is always ready for a game of fetch or a swim.",
    personalityTraits: ["Goofy", "Friendly", "Active"],
    likes: ["Tennis balls", "Water", "Snacks"],
    dislikes: ["Empty bowls"],
    status: "Available",
    imageUrl: getPetImageUrl("Dog", "Labrador", "Rex")
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app1",
    petId: "1",
    petName: "Luna",
    fullName: "John Smith",
    email: "john@example.com",
    phone: "555-0101",
    message: "I've always loved Siamese cats and have a quiet home that would be perfect for Luna.",
    status: "New",
    submittedAt: "2024-05-15T10:30:00Z"
  }
];
