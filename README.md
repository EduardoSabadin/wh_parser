# Wormhole Tools Project

## Overview
The Wormhole Tools is a web application designed to help EVE Online players parse and display information about various wormholes based on user input. It allows users to enter wormhole types and descriptions, providing detailed information about the selected wormhole.

## Project Structure
```
wormhole_tools
├── src/
│ ├── styles.css # Main stylesheet for the parser
│ ├── style_roller.css # Rolling tracker specific styles
│ ├── scripts.js # Parser logic and CSV data
│ └── scripts_roller.js # Rolling tracker functionality
├── index.html # Wormhole parser interface
├── roller.html # Mass rolling tracker interface
└── README.md # Project documentation
```

## Setup
1. Clone the repository or download the project files.
2. Open the `index.html` file in a web browser to view the application.

# Parser Interface
    Enter wormhole type (e.g., "K162" or "B274")
    Paste wormhole description
    Click "Parse" or press Enter
    View detailed wormhole information

# Rolling Tracker
    Mass is automatically set when coming from parser
    Add ships with their mass values
    Track rolls with Light/Heavy buttons
    Mark stage transitions

## Acknowledgments
The wormhole attributes data used in this project were sourced from the [Eve University Wiki](https://wiki.eveuniversity.org/Wormhole_attributes). The content is available under the Creative Commons Attribution-ShareAlike license unless otherwise noted. We greatly appreciate their comprehensive guide for the EVE Online community.

## License
This project is open-source and available for modification and distribution under the same license as the Eve University data when applicable.
