import { ColumnDef } from "@tanstack/react-table"


// status: any;
//     create_at: any;
//     price: number;
//     packgeName: string;
//     description: string;
//     profit: string;
//     roi: string;
// }[] | null

export type Ideposits = {
    status: any;
    create_at: any;
    price: number;
    packgeName: string;
    description: string;
    profit: string;
    roi: string;
}[] | null
export type ITdeposits = {
    status: any;
    create_at: any;
    price: number;
    packgeName: string;
    description: string;
    profit: string;
    roi: string;
    dailyProfit: string
}[] | null

// Create an array of objects representing bank accounts
// export const deposits: Ideposits[] = [
//     {
//         deposit: 1000,
//         id: 1,
        
//         paymentMethod: 'USDT',
//         date: '2024-07-17',
//         profit: 50,
//         status: 'Success'
//     },
//     {
//         deposit: 2000,
//         id: 2,
        
//         paymentMethod: 'BNB',
//         date: '2024-07-15',
//         profit: 3,
//         status: 'Success'
//     },
//     // Add more account objects as needed
//     // ...
//     {
//         deposit: 500,
//         id: 4,
        
//        paymentMethod: 'Bank Transfer',
//         date: '2024-07-20',
//         profit: 70,
//         status: 'Failed'
//     },
//     {
//         deposit: 1500,
//         id: 5,
        
//         paymentMethod: 'Cash',
//         date: '2024-07-18',
//         profit: 20,
//         status: 'Pending'
//     },
//     {
//         deposit: 3000,
//         id: 6,
        
//         paymentMethod: 'PayPal',
//         date: '2024-07-19',
//         profit: 40,
//         status: 'Processing'
//     },
//     {
//         deposit: 800,
//         id: 7,
        
//         paymentMethod: 'Credit Card',
//         date: '2024-07-16',
//         profit: 25,
//         status: 'Success'
//     }
// ];

export const columns: ColumnDef<ITdeposits>[] = [
    
    {
      accessorKey: "id",
      header: "S/N",
    },
    {
        accessorKey: "price",
        header: "Amount",
    },
    {
        accessorKey: "dailyProfit",
        header: "Expected Profit",
    },
    {
        accessorKey: "paymentMethod",
        header: "Package name",
    },
    {
      accessorKey: "create_at",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    }
  ]
export const Packages = [
    {
        price: 150,
        packgeName: 'Bronze Blast',
        description: 'Perfect for beginners, this package offers a solid entry point in the world of investment',
        profit: '10% daily for 10 days',
        roi: '100%'
    },
    {
        price: 300,
        packgeName: 'Silver Strike',
        description: 'This package offers unprecedented returns and ultra-exclussive benefits.',
        profit: '15% daily for 15 days',
        roi: '250%'
    },
    {
        price: 500,
        packgeName: 'Gold Rush',
        description: 'Experience the thrilled significant returns with this package, designed for serious investors',
        profit: '20% daily for 20 days',
        roi: '400%'
    },
    {
        price: 1000,
        packgeName: 'Platinum Premium',
        description: 'Enjoy top-tier benefit and exceptional returns with this elite package',
        profit: '25% daily for 25 days',
        roi: '625%'
    },
    {
        price: 3000,
        packgeName: 'Diamond Deluxe',
        description: 'Indulge in the ultimate investment with this luxurious package',
        profit: '30% daily for 30 days',
        roi: '900%'
    },
    {
        price: 6000,
        packgeName: 'Mastermind',
        description: 'Unlock exclusive benefit and unparalleled return with this package.',
        profit: '35% daily for 35 days',
        roi: '1225%'
    },
    {
        price: 12000,
        packgeName: 'Tycoon',
        description: 'Join the rank of the investment elite with this high-end package.',
        profit: '40% daily for 40 days',
        roi: '1600%'
    },
    {
        price: 20000,
        packgeName: 'Whale',
        description: 'Experience the penacle of investment success with this ultimate package',
        profit: '50% daily for 50 days',
        roi: '2500%'
    },
    {
        price: 30000,
        packgeName: 'Legend',
        description: 'Enter the realm of investment legends with this exclusive package, offering unparallelel returns and VIP treatment',
        profit: '60% daily for 60 days',
        roi: '3600%'
    }
]


// Access individual account properties
// console.log(accounts[0].deposit); // Output: 1000
// console.log(accounts[1].plan);    // Output: Checking
// console.log(accounts[1].status);  // Output: Inactive
// console.log(accounts.length);     // Output: 6 (or more)

// Feel free to adjust the values or add more accounts as needed!
