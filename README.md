# Xirtam

An interactive web application for calculating matrix inverses utilizing the Gauss-Jordan elimination algorithm. Built with React and designed for anyone learning Linear Algebra and Matrix Theory.

![Matrix Inverter](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

###  Features
- **Matrix Presets** - 13 pre-configured example matrices
  - Identity, Diagonal, Symmetric, Singular matrices
  - Covers 2×2, 3×3, and 4×4 sizes
- **Fractional Input** - Enter fractions directly (e.g., `1/2`, `3/4`)
- **Show All Steps** - Toggle between animation and complete solution view
- **Step-by-Step Solution** - Watch the algorithm in action with playback controls

### User Experience
- **Copy to Clipboard** - One-click copy of inverse matrix
- **Toast Notifications** - Visual feedback for all actions
- **Quick Size Selector** - Fast switching between 2×2, 3×3, 4×4
- **Clear All Button** - Quickly reset all values
- **Verification Mode** - Verify A × A⁻¹ = I

## Getting Started

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

## Usage

### Basic Usage
1. Select matrix size (2×2 to 10×10)
2. Enter values in the input cells
3. Click "Calculate Inverse" or press `Enter`
4. View the inverse matrix and step-by-step solution

### Using Presets
1. Choose a preset from the dropdown menu
2. Example presets include:
   - Identity matrices
   - Diagonal matrices
   - Symmetric matrices
   - Singular matrices (non-invertible)
   - Fraction examples

### Fractional Input
Enter fractions directly in any cell:
- `1/2` → 0.5
- `3/4` → 0.75
- `-1/3` → -0.333...

### Step-by-Step Animation
- Use playback controls to navigate through steps
- Click "Show All Steps" to view complete solution
- Watch the Gauss-Jordan algorithm in real-time

### Verification
Click "Verify Result" to see A × A⁻¹ = I calculation with color-coded accuracy indicators.

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with glassmorphism and gradients

## Educational Value

Perfect for:
- **Students** learning linear algebra and matrix operations
- **Educators** demonstrating the Gauss-Jordan algorithm
- **Researchers** verifying manual calculations
- **Anyone** interested in understanding matrix inversion

## Algorithm

The application uses the Gauss-Jordan elimination method:
1. Create augmented matrix [A | I]
2. Apply row operations to transform left side to identity matrix
3. The right side becomes A⁻¹
4. Includes partial pivoting for numerical stability

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with modern web technologies
- Inspired by educational mathematics tools
- Designed for clarity and ease of use

## Contact

Created by [@rosetntdjames](https://github.com/rosetntdjames)

---

