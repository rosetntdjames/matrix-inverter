# XIRTAM - Matrix Inverter

An interactive web application for calculating matrix inverses using the Gauss-Jordan elimination algorithm. Built with React and designed with a premium Material Design aesthetic for students, educators, and anyone learning Linear Algebra.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material Design](https://img.shields.io/badge/Material%20Design-757575?style=for-the-badge&logo=material-design&logoColor=white)

## ✨ Features

### 🎨 Visual Design
- **Material Design 3** - Modern, premium aesthetic with vibrant gradients
- **Dark Mode** - Full dark theme support with persistent preference
- **Authentic Math Notation** - Beautiful matrix brackets in proper mathematical style
- **Smooth Animations** - Premium micro-interactions and transitions throughout
- **Glassmorphism Effects** - Modern frosted-glass visual style
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
### 📚 Educational Tools
- **Elementary Row Operations** - Formal notation (Type I, II, III) with subscript notation
- **Matrix Presets Library** - Pre-configured example matrices:
  - **2×2**: Simple, Identity, Diagonal, Singular
  - **3×3**: Simple, Identity, Symmetric, Diagonal, Upper Triangular, Fractions
  - **4×4**: Simple, Identity, Diagonal
- **Step-by-Step Visualization** - Watch the Gauss-Jordan algorithm in action
  - Playback controls (play, pause, step forward/back)
  - Highlighted row operations
  - Fast Mode for 5×5+ matrices (shows only key steps)
- **Complete Solution View** - Toggle to see all steps at once
- **Verification Mode** - Visual proof that A × A⁻¹ = I
  - Shows matrix multiplication formula
  - Example calculation for first element
  - Color-coded correctness indicators

### 🔢 Advanced Input
- **Fractional Input Support** - Enter fractions directly:
  - Examples: `1/2`, `3/4`, `-2/3`
  - Automatically converts to decimal for calculation
  - Results displayed as simplified fractions
- **Large Matrix Support** - Handle matrices up to 10×10
- **Determinant Display** - Shown for all invertible matrices
- **Singular Matrix Detection** - Clear explanations when matrices can't be inverted
- **Numerical Stability** - Partial pivoting and ill-conditioned matrix warnings

### ⚡ User Experience
- **One-Click Copy** - Copy inverse matrix to clipboard
- **Toast Notifications** - Elegant feedback for all actions
- **Quick Matrix Setup** - 
  - Fast size switching (2×2 through 10×10)
  - One-click preset loading
  - Clear all button
  - Reset to default
- **Intuitive Controls** - Material Design buttons with hover effects
- **Smooth Transitions** - All state changes animated elegantly

### ♿ Accessibility
- **Keyboard Navigation** - Full keyboard support throughout
- **Reduced Motion Support** - Respects user motion preferences
- **High Contrast Mode** - Enhanced visibility for accessibility
- **Touch-Friendly** - Minimum 44px touch targets on mobile
- **Screen Reader Support** - Semantic HTML and ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rosetntdjames/matrix-inverter.git
cd matrix-inverter
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The production build will be in the `dist` directory.

## 📖 Usage Guide

### Basic Workflow
1. **Select Size**: Choose matrix dimensions (2×2 to 10×10)
2. **Input Values**: Either:
   - Manually enter numbers or fractions
   - Load a preset example
3. **Calculate**: Click "Calculate Inverse" 
4. **View Results**: See the inverse matrix with:
   - Determinant value
   - Step-by-step solution
   - Verification option

### Using Presets
The preset library includes educational examples:
- **Identity Matrices** - Their own inverse (A⁻¹ = A)
- **Diagonal Matrices** - Easy to invert
- **Symmetric Matrices** - A = Aᵀ
- **Singular Matrices** - Non-invertible examples
- **Fraction Examples** - Practice with rational numbers

### Step-by-Step Mode
- **Animation Controls**: Play, pause, step forward/back through solution
- **Row Highlighting**: See which rows are being operated on
- **Elementary Row Notation**: Operations shown in formal notation
  - Type I: E₁₂ (row swap)
  - Type II: E₁(c) (scalar multiplication)
  - Type III: E₁₂(c) (row replacement)
- **Fast Mode**: For 5×5+ matrices, shows only pivotal steps

### Verification
Click "Verify Result" to see mathematical proof:
- Matrix multiplication formula
- Detailed calculation example
- Color-coded identity matrix (green = correct, red = error)

### Dark Mode
- Click the sun/moon icon in the header
- Preference saved automatically to localStorage
- Optimized color schemes for both themes

## 🧮 The Algorithm

### Gauss-Jordan Elimination
The application implements the Gauss-Jordan method with numerical enhancements:

1. **Augmentation**: Create [A | I] where I is the identity matrix
2. **Partial Pivoting**: Select largest pivot to minimize rounding errors
3. **Row Operations**: Apply Elementary Row Operations
   - Type I: Swap rows
   - Type II: Scale a row
   - Type III: Add multiple of one row to another
4. **Result**: Transform [A | I] into [I | A⁻¹]

### Error Handling
- **Singular Matrix Detection**: Identifies when det(A) = 0
- **Ill-Conditioned Warnings**: Flags matrices sensitive to rounding errors
- **Educational Explanations**: Clear descriptions of why inversion failed

## 🛠️ Technology Stack

- **React 18** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Custom variables, gradients, animations
- **Lucide React** - Beautiful, consistent icon system
- **Google Fonts** - SF Pro-inspired typography

## 🎓 Educational Value

Perfect for:
- **Linear Algebra Students** - Visualize the Gauss-Jordan algorithm
- **Mathematics Educators** - Demonstrate matrix inversion interactively
- **Researchers** - Quick verification of manual calculations
- **Self-Learners** - Understand each step of the inversion process

### Learning Features
- Watch how Elementary Row Operations transform matrices
- See the relationship between determinants and invertibility
- Understand why some matrices can't be inverted
- Verify results through matrix multiplication

## 🤝 Contributing

Contributions are welcome! Ways to contribute:
- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 🔧 Submit pull requests
- 📖 Improve documentation
- 🎨 Enhance UI/UX design

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Material Design 3 for design inspiration
- Linear algebra educators for algorithmic guidance
- React community for excellent tooling
- Open source contributors

## 📧 Contact

Created by [@rosetntdjames](https://github.com/rosetntdjames)

---

**Built with ❤️ for mathematics education**
