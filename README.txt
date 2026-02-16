# Interactive Mini-Game — Task Specification

Create an interactive mini-game with the following requirements.

## Game Elements

- **10×10 grid** of **blue squares**
- **"Start"** button
- **Input field** for **N** (time in milliseconds)
- **Score display**: **Player vs Computer**

## Game Rules

### 1) Start Action
When the player clicks **Start**:

- A **random blue cell** turns **yellow** (highlighted).
- The player has **N milliseconds** to click the highlighted cell.

### 2) Scoring
- **If the player clicks the yellow cell within N ms:**
  - The cell turns **green permanently**.
  - **Player +1 point**.

- **If the player does not click within N ms:**
  - The cell turns **red permanently**.
  - **Computer +1 point**.

### 3) Game End
- The **first to reach 10 points wins**.
- Show a **custom modal window** with the game results.
- The game **stops** (no more highlights).

## Technical Requirements

- Use **Angular** or **React**
- **HTML5**
- **CSS3**
- **Custom modal** (no standard browser `alert`)
- **Responsive design**

## Evaluation Criteria

- Code structure and organization
- UI/UX implementation
- Game logic implementation
- Error handling
- Performance optimization

## Deliverables

Please provide:

1. A **GitHub repository** with your solution and clear instructions on how to run the application.
2. A **working URL** to the deployed application.