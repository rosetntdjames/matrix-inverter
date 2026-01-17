# Xirtam - Interactive Matrix Inverter

A comprehensive web application for calculating matrix inverses using the Gauss-Jordan elimination algorithm. This educational tool provides step-by-step visualization of the algorithm, making it ideal for learning and teaching linear algebra concepts.

![Matrix Inverter](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Project Overview

This project implements a fully interactive matrix inversion calculator that demonstrates the Gauss-Jordan elimination method. Built with modern web technologies (React and Vite), the application combines mathematical rigor with an intuitive user interface to help students understand matrix operations and linear algebra concepts.

### Key Learning Objectives

Through this project, we have demonstrated understanding of:

1. **Linear Algebra Concepts**
   - Matrix inversion theory and applications
   - Gauss-Jordan elimination algorithm
   - Elementary Row Operations (ERO): Type I (row swap), Type II (scalar multiplication), Type III (row replacement)
   - Determinants and matrix singularity
   - Augmented matrices and identity matrices

2. **Algorithm Implementation**
   - Partial pivoting for numerical stability
   - Handling edge cases (singular matrices, ill-conditioned matrices)
   - Efficient row operations
   - Determinant calculation using cofactor expansion

3. **Web Development Skills**
   - React component architecture and state management
   - Responsive design and mobile optimization
   - User experience (UX) design principles
   - CSS animations and Material Design implementation
   - Accessibility features

4. **Software Engineering Practices**
   - Clean, maintainable code structure
   - Comprehensive error handling
   - Version control with Git
   - Documentation and code comments

## Features

### Visual
- **Matrix Brackets** - Authentic mathematical notation with decorative brackets
- **Determinant Display** - Shows the determinant value for invertible matrices
- **Smooth Animations** - Premium micro-animations and transitions
- **Color-Coded Results** - Visual feedback for correct/incorrect verifications
- **Responsive Design** - Works beautifully on desktop and mobile devices
- **Dark Mode** - Full dark theme with persistent preference

### Educational Features
- **Matrix Presets** - 13 pre-configured example matrices
  - Identity, Diagonal, Symmetric, Singular matrices
  - Covers 2×2, 3×3, and 4×4 sizes
- **Fractional Input** - Enter fractions directly (e.g., `1/2`, `3/4`)
- **Show All Steps** - Toggle between animation and complete solution view
- **Step-by-Step Solution** - Watch the algorithm in action with playback controls
- **Elementary Row Notation** - Formal notation (Type I, II, III) with subscripts

### User Experience
- **Copy to Clipboard** - One-click copy of inverse matrix
- **Toast Notifications** - Visual feedback for all actions
- **Quick Size Selector** - Fast switching between 2×2 through 10×10
- **Clear All Button** - Quickly reset all values
- **Verification Mode** - Verify A × A⁻¹ = I with detailed calculations

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
3. Click "Calculate Inverse"
4. View the inverse matrix and step-by-step solution

### Using Presets
1. Choose a preset from the buttons
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

Results are displayed as simplified fractions.

### Step-by-Step Animation
- Use playback controls to navigate through steps
- Click "Show All Steps" to view complete solution
- Watch the Gauss-Jordan algorithm in real-time
- Row operations shown in formal ERO notation

### Verification
Click "Verify Result" to see A × A⁻¹ = I calculation with:
- Matrix multiplication formula
- Example calculation for first element
- Color-coded accuracy indicators (green for correct, red for errors)

## Technology Stack

- **React** - UI framework with hooks for state management
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Custom styling with Material Design principles

## Algorithm Details

### Gauss-Jordan Elimination Method

The application implements the Gauss-Jordan elimination algorithm:

1. **Augmentation**: Create matrix [A | I] where I is the identity matrix
2. **Partial Pivoting**: Select the largest pivot in each column to minimize rounding errors
3. **Row Operations**: Apply Elementary Row Operations to transform the left side to identity
   - Type I (E_ij): Swap rows i and j
   - Type II (E_i(c)): Multiply row i by scalar c
   - Type III (E_ij(c)): Replace row i with row i + c × row j
4. **Result**: The augmented matrix becomes [I | A⁻¹]

### Error Handling

- **Singular Matrix Detection**: Identifies when det(A) = 0
- **Ill-Conditioned Matrix Warning**: Flags matrices with large condition numbers
- **Numerical Stability**: Uses partial pivoting and appropriate tolerance checks
- **Educational Explanations**: Clear descriptions of why inversion failed

## Educational Value

This project is perfect for:
- **Students** learning linear algebra and matrix operations
- **Educators** demonstrating the Gauss-Jordan algorithm visually
- **Researchers** verifying manual calculations quickly
- **Self-Learners** understanding each step of the inversion process

### Concepts Demonstrated

- Matrix theory and linear transformations
- Computational linear algebra
- Numerical stability considerations
- Algorithm visualization and teaching
- Modern web application development

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Linear algebra textbooks for theoretical foundation
- Material Design for UI/UX inspiration
- React community for excellent documentation
- Educational mathematics tools for design ideas

## Contact

Created by [@rosetntdjames](https://github.com/rosetntdjames)

---

**Built for Linear Algebra Education**
