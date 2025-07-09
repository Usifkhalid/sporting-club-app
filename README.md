# 🏆 Sporting Club Management System

A modern, responsive web application for managing sports clubs, members, and subscriptions. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### 🏃‍♂️ **Sports Management**

- Add and manage sports programs
- Track capacity and availability
- View instructor information and schedules
- Real-time availability status

### 👥 **Member Management**

- Comprehensive member profiles
- Membership type tracking (Basic, Premium, VIP)
- Sports preferences and subscriptions
- Status management (Active, Inactive, Pending)

### 💳 **Subscription System**

- Member-to-sport subscription management
- Payment method tracking
- Duplicate prevention
- Subscription status monitoring

### 🎨 **Modern UI/UX**

- Fully responsive design (mobile-first)
- Clean, professional interface
- Real-time form validation
- Interactive components with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Mock Data**: MirageJS
- **Components**: Custom reusable component library
- **Validation**: Custom validation utility
- **Deployment**: Vercel-ready

## 🏗️ Project Structure

```
sporting-club-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Dashboard
│   │   ├── sports/            # Sports management
│   │   ├── members/           # Member management
│   │   └── subscriptions/     # Subscription management
│   ├── components/            # Reusable components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Layout components
│   ├── data/                 # Mock data and types
│   └── utils/                # Utility functions
├── public/                   # Static assets
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sporting-club-app.git
   cd sporting-club-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Form Validation

- **Real-time validation** with immediate feedback
- **Custom validation rules** for different field types
- **Error prevention** with required field checking
- **User-friendly error messages**

### Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interface** with proper button sizing
- **Optimized for all devices** (mobile, tablet, desktop)

### Reusable Components

- **FormInput** - Handles text, email, tel, number, and textarea
- **FormSelect** - Dropdown selections with validation
- **FormCheckbox** - Checkbox inputs with descriptions
- **FormButton** - Consistent button styling with variants
- **ResponsiveContainer** - Layout wrapper with responsive padding

## 🔧 Customization

### Adding New Sports

1. Navigate to `/sports`
2. Click "Add New Sport"
3. Fill in the required fields
4. Submit to add to the list

### Managing Members

1. Go to `/members`
2. Click "Add New Member"
3. Complete the form with validation
4. Select sports preferences

### Creating Subscriptions

1. Visit `/subscriptions`
2. Click "Add New Subscription"
3. Select member and sports
4. Choose payment method

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **TypeScript** for type safety
- **MirageJS** for mock API functionality

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
