'use strict'

const _ = require('lodash')
const db = require('../../helpers/db')

db.connectMongo()


const categories = [
  {
    name: 'smoothies',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/swag-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/swag-1.jpg",
        "name": "Swag",
        "actualPrice": "200",
        "discountPrice": "200",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Almond milk, Guava, Chia seeds, Spirulina"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/thalaiva-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/thalaiva.jpg",
        "name": "Thalaiva",
        "actualPrice": "245",
        "discountPrice": "245",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Almonds, Cashew, Raisins, Pista, Walnuts, Figs"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/super-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/super.jpg",
        "name": "Super Nova",
        "actualPrice": "245",
        "discountPrice": "245",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Peanut Butter and Dark Chocolate"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/rogue-300x300.jpeg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/rogue.jpeg",
        "name": "Rogue",
        "actualPrice": "245",
        "discountPrice": "245",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Almonds, Sapota, Apple"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/newyorker-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/newyorker.jpg",
        "name": "New Yorker",
        "actualPrice": "245",
        "discountPrice": "245",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Cocoa, Dark Chocolate, Almonds"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/barba-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/barba.jpg",
        "name": "Barbarian",
        "actualPrice": "200",
        "discountPrice": "200",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Sapotta, Avacado, Paneer, Coffee, Dates, Cocoa Powder, Milk"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Dyna-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Dyna.jpg",
        "name": "Dynamight",
        "actualPrice": "245",
        "discountPrice": "245",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Musk Melon, Papaya, Pista, Honey, Cardamom, Milk, Whey Protein"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/nuts-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/nuts.jpg",
        "name": "Naked Nuts",
        "actualPrice": "200",
        "discountPrice": "200",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, milk, Almonds, Pista, Walnuts, Cashews, Raisins and Figs"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/big-jo-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/big-jo.jpg",
        "name": "Big Jo",
        "actualPrice": "200",
        "discountPrice": "200",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, milk, Peanut butter, Dark Chocolate"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/first-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/first.jpg",
        "name": "First Knight",
        "actualPrice": "200",
        "discountPrice": "200",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, milk, Almonds, Sapota, Apple"
      }
    ]
  },
  {
    name: 'cold pressed',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/citrus-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/citrus.jpg",
        "name": "CITRUS SLAP",
        "actualPrice": "145",
        "discountPrice": "145",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Tender Coconut Water, Orange, Pineapple, Sweetlime",
        "goodness": "Intended for the summer, this drink is loaded with a selection of bright and sweet fruits. A perfect thirst quencher for a hot summers’ day! Orange, pineapple, and sweet lime, all offer a healthy dose of vitamin C while also contributing to your body’s wellness by reducing inflammation. The nutrients derived from these fruits are great for digestion and skin. A wise combination of fruits that result in just the right level of tanginess balancing your body’s electrolyte levels.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 30.16",
          "Fat(g) 0.1",
          "Carbohydrates(g) 7.41",
          "Total Sugar(g) 6.87",
          "Protein(g) 0.13",
          "Weight Watchers Points: Medium",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ],
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/chalko-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/chalko.jpg",
        "name": "CHALKO",
        "actualPrice": "135",
        "discountPrice": "135",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Activated Charcoal, Tender Coconut Water, Ginger",
        "goodness": "You are what you eat. This is must in your essential skin regime, this fine blend of activated charcoal and tender coconut water will be for your internal spa! Activated charcoal works as a toxin trapper, binding the toxins in your system and flushing them out quickly. It also alleviates gas and bloating, treats alcohol poisoning, and hangovers. It is an overall cleanse for your digestive system, and with the added goodness of tender coconut water, this drink can help you stay hydrated.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 5.52",
          "Fat (g) 0",
          "Carbohydrates (g) 1.38",
          "Total Sugar (g) 0",
          "Protein (g) 0",
          "Weight Watchers Points:  Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ],
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/beet-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/beet.jpg",
        "name": "French Kiss",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Apple, Beet, Carrot, Ginger",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "A healthy detox drink that can help flush the toxins out of your system and replenish your body with healthy nutrients in large doses. Besides being incredibly delicious, this juice is impressively healthy with Vitamins A, K and beta carotene from the carrots, vitamin C and polyphenols from the apples, antioxidants, and folate from the beets, and anti-inflammatory benefits from the ginger. Beets come loaded with essential minerals that help promote healthy nerve and muscle function and give you great skin.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 28",
          "Fat (g) 0.1",
          "Carbohydrates (g) 5.9",
          "Total Sugar (g) 5",
          "Protein (g) 1",
          "Weight Watchers Points: Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/punk-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/punk.jpg",
        "name": "PUNK",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Banana Stem, Arugampul (Bermuda Grass), Wheatgrass, Spirulina, Spinach, Bael Leaves, Lemon Grass, Lemon, Coconut Oil, Cumin, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "This magic potion is loaded with various greens, including spirulina, making it an elixir, packed with superpowers to cure. It is enriched with the finest greens available in the nature’s lap such as wheat grass, lemongrass, bermuda grass, bael leaves, and many more. Pressed together, they aid in weight loss, improved digestion, blood sugar levels, and blood pressure control, restoration of hormonal balance when consumed every day.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 104",
          "Fat (g) 4",
          "Carbohydrates (g) 15",
          "Total Sugar (g) 2",
          "Protein (g) 6",
          "Weight Watchers Points: Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/greeny-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/greeny.jpg",
        "name": "GREENY",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Broccoli, Drumstick Leaves, Lettuce, Capsicum, Celery, Cucumber, Lemon, Mint, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "What better way to get on a green habit with a bunch of nutritive vegetables at hand? This drink is high in nutritive value and contains the goodness of broccoli and drumstick leaves, something new and different, in addition to other healthy greens. The high vitamin content in broccoli is known to combat diseases and acts as powerful antioxidant just like drumstick leaves. The nutrients in lettuce, celery, and cucumber aid in detoxification and promote a healthy digestive system. Capsicum, lemon and mint on the other hand is added to this drink as it encourages immunity in the body.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 12",
          "Fat (g) 0.1",
          "Carbohydrates (g) 2.2",
          "Total Sugar (g) 0",
          "Protein (g) 0.6",
          "Weight Watchers Points: Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Jade-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Jade.jpg",
        "name": "JADE",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Amaranth, Fenugreek, Spinach, Cucumber, Bottle Gourd, Coriander, Ginger, Mint, Lemon, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "Amaranth, the key ingredient in this drink is one of the top superfoods for its innumerable health benefits. This is further blended with bountiful of other wonderful greens. Amaranth is a key source of vitamins and minerals promoting overall wellness, immunity, and keeping the heart healthy. Fenugreek is a natural healer when it comes to daily issues such as stomach disorders, sore throat and inflammation. The greens in this drink contribute to detoxification and are rich in antioxidants.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 11.5",
          "Fat (g) 0",
          "Carbohydrates (g) 2.88",
          "Total Sugar (g) 1.13",
          "Protein (g) 0",
          "Weight Watchers Points: Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/eden-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/eden.jpg",
        "name": "EDEN",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Cucumber, Spinach, Bottle Gourd, Coriander, Ginger, Mint, Lemon, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "With over a kilo of vegetables pressed to extract the freshest juice, this drink is a green indulgence. Cucumber, bottle gourd, and coriander are rich in vitamin K while spinach is rich in iron. Ginger, mint, and lemon contribute as healing elements to this drink, ginger and mint being rich in anti-inflammatory properties. This drink promotes weight loss, healing of urinary tract infections and reduces inflammation of the liver. It also helps in treating problems related to digestive system like acidity and flatulence.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 14.3",
          "Fat (g) 0.1",
          "Carbohydrates (g) 3.6",
          "Total Sugar (g) 2.2",
          "Protein (g) 0.1",
          "Weight Watchers Points: Low",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Rabb-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Rabb.jpg",
        "name": "STONED RABBIT",
        "actualPrice": "150",
        "discountPrice": "150",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Carrots, Turmeric, Ginger",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "A super food trio with innumerable benefits. This is a golden genie sent to heal your body. Benefits of turmeric is estimated to contain around 150 different therapeutic elements, including boosting your immunity, protecting your heart and moderating the effects of autoimmune diseases. Ginger on the other hand provides your body with a healing touch as it is rich in gingerol, a substance with powerful medicinal properties. Phytonutrients such as lutein and anthocyanins in carrot, join vitamins and minerals for extraordinary health-boosting potential -vitamins A, B6, C and K as some of the most beneficial and several minerals.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 31",
          "Fat (g) 0.1",
          "Carbohydrates (g) 6.9",
          "Total Sugar (g) 4.7",
          "Protein (g) 0.7",
          "Weight Watchers Points: Medium",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/owl-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/owl.jpg",
        "name": "ORANGE OWL",
        "actualPrice": "145",
        "discountPrice": "145",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Orange, Carrot",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "A large dose of vitamin C and splash of sweetness – orange is about to be your new favorite color. Oranges are rich in vitamin C while also providing you an optimum dose of calcium. Carrots are a good source of calcium, copper, potassium and Vitamin B. They decrease the risk of heart disease and stroke. They maintain healthy vision and are high in antioxidants. Carrots also contain Vitamin C that aids the collagen production in the body.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 43.1",
          "Fat (g) 0.1",
          "Carbohydrates (g) 10.7",
          "Total Sugar (g) 7.7",
          "Protein (g) 0.1",
          "Weight Watchers Points: Medium",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/pomo_1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/pomo_1.jpg",
        "name": "POMO-GRENADE",
        "actualPrice": "155",
        "discountPrice": "155",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Tender Coconut Water, Pomegranate",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "A gentle tender coconut water-based drink with a beautiful blend of fresh pomegranate, a great way to stay hydrated through the day. The juice of young tender coconuts, is nature’s solution to help replenish the potassium, other electrolytes and water that you need when dehydrated. The consumption of pomegranate juice is said to help counter-balance a diet that is heavy in fats and sugars. This combination can help protect you against infections and keep you disease-free.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 30",
          "Fat (g) 0",
          "Carbohydrates (g) 7.4",
          "Total Sugar (g) 6.8",
          "Protein (g) 0.1",
          "Weight Watchers Points: Medium",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/charger-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/charger.jpg",
        "name": "CHARGER",
        "actualPrice": "145",
        "discountPrice": "145",
        "volume": "300",
        "measuringUnit": "ml",
        "ingredient": "Watermelon, Pineapple",
        "category": "5cbc71a01df6892eaff071b1",
        "goodness": "This drink is what we’d like to call a perfect marriage between watermelon and pineapple. Kids particularly enjoy this for its freshness and sweet burst of seasonal flavor! This is an ideal, fun healthy drink to replace the carbonated drinks at your party. Watermelon is rich in antioxidants and vitamin C. It also contains several versatile nutrients such as choline and lycopene that help reduce inflammation and muscle soreness. It is a great source of hydration, and when blended with pineapple makes it a perfect light and refreshing beverage to help revitalize and cleanse your body.",
        "intention": "Our cold-pressed juices are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy (kcal) 32",
          "Fat (g) 0.1",
          "Carbohydrates (g) 7.4",
          "Total Sugar (g) 7",
          "Protein (g) 0.3",
          "Weight Watchers Points: Medium",
          "To be consume on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      }
    ],
  },
  {
    name: 'packages',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/make-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/make.jpg",
        "name": "Make It A Habit",
        "actualPrice": "9598",
        "discountPrice": "7999",
        "noOfDays": "21",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "It takes 21 dayes to build a habbit.Cleanse your body of toxins.alkalise and rev up with your metabolism. Choose any 2 products from our menuand enjoy preservative free, Healthy food delivered to you everyday for 21 days."
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/10-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/10.jpg",
        "name": "10 Day Reset",
        "actualPrice": "4798",
        "discountPrice": "3999",
        "noOfDays": "10",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Reset your life with a 10 day clean eating redimen. A remainder of promised health benefits of high energywithout any added sugar. Get rid of piled up toxins and load upon deprived vitamins and minerals this week. Choose any 2 product from our menuand enjoy a completely fresh unadulterated food delivered to you every day for 10 days"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/detox-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/detox.jpg",
        "name": "Detox Week",
        "actualPrice": "3300",
        "discountPrice": "2750",
        "measuringUnit": "ml",
        "noOfDays": "7",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Feel light in a week.Refuel your body with healthy nutrients and antioxidantswithout depriving yourself. Choose any 2 products delivered to you everydays for 7 days.Great way to loose some weight before a D day. Our products have no added sugar no added water and of course, no other nonsense"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/cold_07-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/cold_07.jpg",
        "name": "Cold Pressed Juices",
        "discountPrice": 1800,
        "actualPrice": 2160,
        "noOfDays": 7,
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Two cold Pressed Juice delivered to you everyday from a wide variety of green vegetable and fruit juices"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/smoothies-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/smoothies.jpg",
        "name": "Smoothies",
        "discountPrice": "2499",
        "actualPrice": 2998,
        "measuringUnit": "ml",
        "noOfDays": "7",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Two smoothies delivered to you everyday. Before workout after workout breakfast replacement choose to have it at your convenience"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/1.jpg",
        "name": "One Day Cleanse",
        "discountPrice": "999",
        "actualPrice": "1198",
        "noOfDays": 1,
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "One day Cleanse. Choose 5 Products from a wide range of smoothies juices and salad to de bloat repair heel and give your digestive system its much neededcleanse from processed food"
      }
    ]
  },
  {
    name: 'probiotics',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/xoxo-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/xoxo.jpg",
        "name": "XOXO",
        "discountPrice": "135",
        "actualPrice": "135",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Coriander, Mint, Curry Leaves, Celery, Green Chili, Spice Mix, Himalayan Salt",
        "goodness": "This probiotic drink is loaded with good, helpful bacteria from yogurt, and a well curated selection of greens high in nutritive value and great in taste! It is also high in B vitamins, particularly vitamin B12 and riboflavin, both of which may protect against heart disease. This naturally fermented yogurt contains lots of probiotic cultures that strengthen the digestive tract. The greens in this probiotic drink help promote digestive wellness and load your body with minerals to keep infections out of the way.",
        "intention": "Our probiotics are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle",
        "nutrition": [
          "Energy(kcal) 78.84",
          "Fat(g) 0.52",
          "Carbohydrates(g) 13.18",
          "Total Sugar(g) 4.55",
          "Protein(g) 5.36",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/assassin-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/assassin.jpg",
        "name": "Assassin",
        "discountPrice": "135",
        "actualPrice": "135",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Strawberry, honey",
        "goodness": "Curd and Strawberry, these two powerful ingredients are mixed together, you reap double the skin beneficial effects. It is also high in B vitamins, particularly vitamin B12 and riboflavin, both of which may protect against heart disease. This mixture of strawberry and curd is rich in vitamin C, which can nourish your skin cells and boost the production of collagen, thereby easing away fine lines and wrinkles. Naturally fermented yogurt contains lots of probiotic cultures that strengthen the digestive tract. This drink can offer protection for bones and teeth and help prevent digestive problems.",
        "intention": "Our probiotics are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle",
        "nutrition": [
          "Energy(kcal) 78.84",
          "Fat(g) 0.52",
          "Carbohydrates(g) 13.18",
          "Total Sugar(g) 4.55",
          "Protein(g) 5.36",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/halogen-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/halogen.jpg",
        "name": "Halogen",
        "discountPrice": "135",
        "actualPrice": "135",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Mango",
        "goodness": "Mangoes have generous levels of vitamin C and vitamin A in keep the immune system healthy and strong. The fibre, potassium and vitamin content in mangoes keeps heart healthy. Yogurt on the other hand is high in B vitamins, particularly vitamin B12 and riboflavin, both of which may protect against heart disease. Together they leave an alkalizing effect and make for supple skin.Naturally fermented yogurt contains lots of probiotic cultures that strengthen the digestive tract.",
        "intention": "Our probiotics are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle",
        "nutrition": [
          "Energy(kcal) 78.84",
          "Fat(g) 0.52",
          "Carbohydrates(g) 13.18",
          "Total Sugar(g) 4.55",
          "Protein(g) 5.36",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/prob-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/prob.jpg",
        "name": "Mario",
        "discountPrice": "135",
        "actualPrice": "135",
        "volume": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Musk Melon, Papaya, Orange, Psyllium husk",
        "goodness": "Papayas contain a healthy dose of fiber and potassium for the benefit of good cardiovascular health, vitamins A and C for skin and mucosal cell rejuvenation, and folate which contributes to cellular metabolism. Muskmelons on the other hand are rich in potassium which helps in regulating the blood pressure and keeps hypertension at bay. Oranges add the required tang and Vitamin C to the drink. Yogurt is also high in B vitamins, particularly vitamin B12 and riboflavin, both of which may protect against heart disease. Because of its excellent water solubility, psyllium husk and its resistance to digestion allows it to help regulate high cholesterol, triglycerides and blood sugar levels. It can also aid weight management and relieve diarrhea and constipation.",
        "intention": "Our probiotics are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle",
        "nutrition": [
          "Energy(kcal) 78.84",
          "Fat(g) 0.52",
          "Carbohydrates(g) 13.18",
          "Total Sugar(g) 4.55",
          "Protein(g) 5.36",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      }
    ]
  },
  {
    name: 'salads',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Paneer)",
        "discountPrice": "190",
        "actualPrice": "190",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "goodness": "A crunchy salad with nuts and a well selected array of veggies makes this salad very enjoyable with a fun dressing. The greens in this salad, including purple cabbage, contain a handful of vital vitamins that cleanse your body of toxins and promote a healthy balance of nutrients in your body. Eating a little good fat from the dressing like the monounsaturated fat found in olive oil aids in absorption of protective phyto-chemicals (known to protect against cancer and heart disease), like lycopene from tomatoes and lutein from dark green vegetables. Peanuts and cashew nuts contribute to the required amount of protein, calcium and heart healthy fats required by your body. Sun dried tomatoes detoxify your skin and leave you feeling fresh and light.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 181.82",
          "Fat(g) 10.26",
          "Carbohydrates(g) 16.14",
          "Total Sugar(g) 3.85",
          "Protein(g) 6.23",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Chicken)",
        "code": "210",
        "symbol": "₹",
        "discountPrice": "210",
        "actualPrice": "210",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "goodness": "A crunchy salad with nuts and a well selected array of veggies makes this salad very enjoyable with a fun dressing. The greens in this salad, including purple cabbage, contain a handful of vital vitamins that cleanse your body of toxins and promote a healthy balance of nutrients in your body. Eating a little good fat from the dressing like the monounsaturated fat found in olive oil aids in absorption of protective phyto-chemicals (known to protect against cancer and heart disease), like lycopene from tomatoes and lutein from dark green vegetables. Peanuts and cashew nuts contribute to the required amount of protein, calcium and heart healthy fats required by your body. Sun dried tomatoes detoxify your skin and leave you feeling fresh and light.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 181.82",
          "Fat(g) 10.26",
          "Carbohydrates(g) 16.14",
          "Total Sugar(g) 3.85",
          "Protein(g) 6.23",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Eggs)",
        "discountPrice": "200",
        "actualPrice": "200",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "goodness": "A crunchy salad with nuts and a well selected array of veggies makes this salad very enjoyable with a fun dressing. The greens in this salad, including purple cabbage, contain a handful of vital vitamins that cleanse your body of toxins and promote a healthy balance of nutrients in your body. Eating a little good fat from the dressing like the monounsaturated fat found in olive oil aids in absorption of protective phyto-chemicals (known to protect against cancer and heart disease), like lycopene from tomatoes and lutein from dark green vegetables. Peanuts and cashew nuts contribute to the required amount of protein, calcium and heart healthy fats required by your body. Sun dried tomatoes detoxify your skin and leave you feeling fresh and light",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 181.82",
          "Fat(g) 10.26",
          "Carbohydrates(g) 16.14",
          "Total Sugar(g) 3.85",
          "Protein(g) 6.23",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Chicken)",
        "code": "210",
        "symbol": "₹",
        "discountPrice": "210",
        "actualPrice": "210",
        "volume": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "goodness": "Black rice contains anthocyanin and an important antioxidant Vitamin E, which is useful in maintaining eye, skin, and immune health. The benefits of consuming a variety of vegetables can be rewarding for your body as vegetables contain nutrients like potassium, dietary fiber, folic acid, vitamin A, and vitamin C. Capsicum’s beneficial uses are numerous. It is used to alleviate – muscle cramps, sore throat, diabetes, hypotension, heart problems, gastro-intestinal problems, food poisoning, asthma and more. It also is a very efficient plant to use for enhancing metabolism, immune system skin health and treat menopausal symptoms.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 185.31",
          "Fat(g) 7.11",
          "Carbohydrates(g) 20.95",
          "Total Sugar(g) 5.28",
          "Protein(g) 9.38",
          "Weight Watchers Points: Medium",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Paneer)",
        "discountPrice": "190",
        "actualPrice": "190",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese",
        "goodness": "Black rice contains anthocyanin and an important antioxidant Vitamin E, which is useful in maintaining eye, skin, and immune health. The benefits of consuming a variety of vegetables can be rewarding for your body as vegetables contain nutrients like potassium, dietary fiber, folic acid, vitamin A, and vitamin C. Capsicum’s beneficial uses are numerous. It is used to alleviate – muscle cramps, sore throat, diabetes, hypotension, heart problems, gastro-intestinal problems, food poisoning, asthma and more. It also is a very efficient plant to use for enhancing metabolism, immune system skin health and treat menopausal symptoms.",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 185.31",
          "Fat(g) 7.11",
          "Carbohydrates(g) 20.95",
          "Total Sugar(g) 5.28",
          "Protein(g) 9.38",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1.jpg",
        "name": "Farm Frenzy (Chicken)",
        "discountPrice": "210",
        "actualPrice": "210",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt",
        "goodness": "Intended for the summer, this drink is loaded with a selection of bright and sweet fruits. A perfect thirst quencher for a hot summers’ day! Orange, pineapple, and sweet lime, all offer a healthy dose of vitamin C while also contributing to your body’s wellness by reducing inflammation. The nutrients derived from these fruits are great for digestion and skin. A wise combination of fruits that result in just the right level of tanginess balancing your body’s electrolyte levels.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 30.16",
          "Fat(g) 0.1",
          "Carbohydrates(g) 7.41",
          "Total Sugar(g) 6.87",
          "Protein(g) 0.13",
          "Weight Watchers Points: Medium",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1.jpg",
        "name": "Farm Frenzy (Eggs)",
        "discountPrice": "200",
        "actualPrice": "200",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt",
        "goodness": "A healthy dose of super-foods such as black rice, cottage cheese, bell peppers, carrots, cashews and more! Black rice contains anthocyanin and an important antioxidant Vitamin E, which is useful in maintaining eye, skin, and immune health. The benefits of consuming a variety of vegetables can be rewarding for your body as vegetables contain nutrients like potassium, dietary fiber, folic acid, vitamin A, and vitamin C. Committing to eating more vegetables is one of the easiest ways to improve your health, fast.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 185.31",
          "Fat(g) 7.11",
          "Carbohydrates(g) 20.95",
          "Total Sugar(g) 5.28",
          "Protein(g) 9.38",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Eggs)",
        "discountPrice": "200",
        "actualPrice": "200",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "dressing": "Sun Dried Tomatoes, Almond Meal, Balsamic Vinegar, Garlic, Oregano, Olive Oil",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese",
        "goodness": "Black rice contains anthocyanin and an important antioxidant Vitamin E, which is useful in maintaining eye, skin, and immune health. The benefits of consuming a variety of vegetables can be rewarding for your body as vegetables contain nutrients like potassium, dietary fiber, folic acid, vitamin A, and vitamin C. Capsicum’s beneficial uses are numerous. It is used to alleviate – muscle cramps, sore throat, diabetes, hypotension, heart problems, gastro-intestinal problems, food poisoning, asthma and more. It also is a very efficient plant to use for enhancing metabolism, immune system skin health and treat menopausal symptoms.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 185.31",
          "Fat(g) 7.11",
          "Carbohydrates(g) 20.95",
          "Total Sugar(g) 5.28",
          "Protein(g) 9.38",
          "Weight Watchers Points: Medium",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1.jpg",
        "name": "Farm Frenzy (Paneer)",
        "discountPrice": "190",
        "actualPrice": "190",
        "volume": "300",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt",
        "goodness": "A healthy dose of super-foods such as black rice, cottage cheese, bell peppers, carrots, cashews and more! Black rice contains anthocyanin and an important antioxidant Vitamin E, which is useful in maintaining eye, skin, and immune health. The benefits of consuming a variety of vegetables can be rewarding for your body as vegetables contain nutrients like potassium, dietary fiber, folic acid, vitamin A, and vitamin C. Committing to eating more vegetables is one of the easiest ways to improve your health, fast.",
        "intention": "Our salads are composed with your nutritional needs in mind. They not only make use of the traditional ingredients for health-giving but that they also are carefully balanced to include a comprehensive collection of the nutrients your body needs for natural and traditional lifestyle.",
        "nutrition": [
          "Energy(kcal) 185.31",
          "Fat(g) 7.11",
          "Carbohydrates(g) 20.95",
          "Total Sugar(g) 5.28",
          "Protein(g) 9.38",
          "To be consumed on the same day of delivery",
          "Shake Well",
          "Serve Chilled",
          "Portion Size: 300ml"
        ]
      }
    ]
  }
]

const insertData = () => {
  try {
    console.log('inserting products')
    const ProductModel = require('../../models/product')
    _.each(categories, async (category) => {
      const daa = await ProductModel.insertMany(category.data)
    })
    console.log('Process ended')
    // process.exit(1)
  } catch (error) {
    console.error('Error occured')
    console.error(error)
  }
}

setTimeout(() => {
  insertData()
}, 1000)
