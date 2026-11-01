# AI MYSTERY ROOM
## Master Product Requirements & Technical Specification

**Document Version:** 1.0  
**Project Name:** AI Mystery Room  
**Document Type:** Product Requirements Document (PRD) + Software Technical Specification (SRS)  
**Development Approach:** Spec-Driven Development  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Engine:** Google Gemini API  
**Architecture:** MERN Stack

---

# 1. PROJECT OVERVIEW

## 1.1 Introduction

AI Mystery Room is an interactive, AI-powered mystery investigation platform where users become investigators and solve fictional criminal cases generated dynamically by Artificial Intelligence.

Users provide a short scenario, story idea, or mystery theme. Based on the input, the AI generates a complete fictional investigation containing:

- A mystery storyline.
- A set of suspects.
- One actual culprit.
- Motives and character backgrounds.
- Evidence and investigation materials.
- Misleading clues and red herrings.
- A final solution and explanation.

The platform presents the generated investigation to the user through an interactive investigation interface.

Users examine evidence, connect clues, analyze statements, and ultimately identify the culprit.

The objective is to create an immersive detective experience where every investigation is unique and generated dynamically using Google Gemini.

## 1.2 Core Concept

**Give AI a story. Get a mystery. Investigate the evidence. Find the culprit.**

Example:

User Input:

"A businessman was found dead inside his locked office at midnight. Four employees had access to the office, and one of them is responsible."

AI Output:

- Case: The Midnight Office Murder
- Four suspects.
- Individual suspect profiles.
- WhatsApp conversations.
- CCTV footage descriptions or generated video assets.
- Photographic evidence.
- Witness statements.
- Timeline of events.
- Hidden clues.
- One actual culprit.

The user investigates the case and submits their final accusation.

The system then evaluates the accusation and reveals the complete explanation.

---

# 2. PROJECT OBJECTIVES

The primary objectives are:

1. Allow users to create mysteries from their own story ideas.
2. Generate complete fictional investigations using Gemini AI.
3. Generate realistic investigation evidence.
4. Provide an interactive detective investigation experience.
5. Ensure that every mystery has exactly one predefined culprit.
6. Make evidence logically consistent with the storyline.
7. Allow users to submit their final suspect selection.
8. Evaluate the user's answer and explain the solution.
9. Provide a replayable experience with different mysteries.
10. Create an extensible architecture for future AI-generated multimedia evidence.

---

# 3. USER ROLES

## 3.1 Guest User

A guest user can:

- Access the homepage.
- Read project information.
- Enter a mystery scenario.
- Generate a mystery.
- Investigate an active case.
- View evidence.
- Select a culprit.
- View the final result.

Authentication is not mandatory for the initial MVP.

## 3.2 Registered User (Future Enhancement)

Registered users may eventually:

- Save investigations.
- Access investigation history.
- Resume incomplete cases.
- View statistics.
- Track completed mysteries.
- Maintain detective scores.

Authentication is outside the initial MVP unless explicitly approved.

---

# 4. TECHNOLOGY STACK

## 4.1 Frontend

- React.js
- Vite
- JavaScript or TypeScript (TypeScript preferred)
- Tailwind CSS
- React Router
- Axios
- Lucide React icons

Responsibilities:

- Display the user interface.
- Collect mystery scenarios.
- Display generated investigations.
- Present evidence.
- Manage investigation progress.
- Handle suspect selection.
- Display investigation results.

## 4.2 Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini SDK
- Multer (if required for asset uploads)
- Zod (request and AI response validation)

Responsibilities:

- Handle API requests.
- Integrate Gemini AI.
- Generate mystery cases.
- Validate AI-generated content.
- Store investigation data.
- Manage investigation state.
- Evaluate final answers.
- Protect API credentials.

## 4.3 AI Integration

**Primary AI Provider:** Google Gemini

The Gemini API will be responsible for:

1. Understanding the user's scenario.
2. Creating the mystery storyline.
3. Generating suspects and their backgrounds.
4. Selecting one actual culprit.
5. Creating the evidence.
6. Generating misleading clues.
7. Creating a chronological timeline.
8. Generating the final solution.
9. Providing explanations for the evidence.

Important: The actual culprit must be established before the investigation is presented to the user.

The AI must not change the culprit during the investigation.

## 4.4 Multimedia Generation

AI-generated investigation assets may include:

- Images.
- WhatsApp-style conversations.
- CCTV evidence.
- Audio recordings.
- Documents.
- Screenshots.

Gemini will be the primary reasoning and content-generation engine.

For actual image, audio, and video generation, use a separate compatible generation provider or model when necessary.

Do not assume Gemini text generation automatically creates downloadable image, audio, or video files.

For the MVP, text-based evidence and image evidence can be supported first. CCTV can initially be represented through fictional footage descriptions, timestamps, and extracted observations.

---

# 5. APPLICATION STRUCTURE

The application should contain the following main pages:

1. Landing Page
2. Create Mystery Page
3. Mystery Generation / Loading Page
4. Investigation Dashboard
5. Evidence Viewer
6. Final Accusation Page
7. Investigation Results Page

---

# 6. FUNCTIONAL REQUIREMENTS

## 6.1 Landing Page

Purpose: Introduce the platform and encourage users to start an investigation.

Required elements:

- Application logo and name.
- Navigation bar.
- Hero section.
- Main heading: "Every Mystery Has a Secret. Can You Find It?"
- Short project description.
- Primary CTA: "Start Investigation".
- Secondary CTA: "How It Works".
- Featured mystery or example investigation.
- How It Works section.
- Footer.

CTA behavior:

Clicking "Start Investigation" navigates to the Create Mystery page.

## 6.2 Create Mystery Page

Purpose: Collect the user's mystery scenario.

Input fields:

**Scenario / Story Description**
- Multiline text area.
- Required field.
- Minimum 30 characters.
- Maximum 2,000 characters.

**Mystery Category**
- Murder.
- Theft.
- Missing Person.
- Corporate Espionage.
- Blackmail.
- Cybercrime.
- Other.

**Difficulty Level**
- Easy.
- Medium.
- Hard.

**Number of Suspects**
- Minimum: 3.
- Maximum: 6.
- Default: 4.

**Generation Button**
- Label: Generate Mystery.
- Disabled when required input is invalid.
- Displays loading state during generation.

The frontend sends the input to the backend.

The backend validates the request and initiates mystery generation.

## 6.3 Mystery Generation Engine

This is the core functionality of the entire application.

The AI must generate a complete, internally consistent investigation.

### Generation Pipeline

Step 1: Understand the user's scenario.

Step 2: Expand the scenario into a complete fictional storyline.

Step 3: Establish the actual culprit.

Step 4: Generate the victim and suspect profiles.

Step 5: Establish the motive, opportunity, and method.

Step 6: Generate the investigation timeline.

Step 7: Generate evidence.

Step 8: Generate misleading evidence.

Step 9: Validate logical consistency.

Step 10: Save the complete investigation in MongoDB.

Step 11: Return a case ID to the frontend.

The investigation must not become available until all mandatory generation and validation steps are complete.

### Important AI Rules

- Exactly one culprit must exist.
- The culprit must be selected before evidence generation.
- Every suspect must have a background and potential motive.
- At least one evidence item must strongly support the correct culprit.
- Evidence must not contradict the established storyline.
- Red herrings must be explainable.
- The final solution must match the actual culprit.
- Suspect identities must remain consistent across all evidence.
- All dates and times must follow one consistent case timeline.
- The actual culprit must never be exposed through the public investigation API.

## 6.4 Investigation Dashboard

Purpose: Provide the user with a central place to investigate the mystery.

Required components:

**Case Information**
- Case title.
- Case description.
- Case category.
- Difficulty.
- Case ID.

**Investigation Summary**
- Victim details.
- Incident location.
- Incident date and time.
- Initial incident report.

**Suspect Board**
- Display all suspects.
- Suspect name.
- Profile image or avatar.
- Age.
- Occupation.
- Relationship with victim.
- Background information.
- Potential motive.

**Evidence Categories**
- Messages.
- Images.
- CCTV.
- Documents.
- Witness Statements.
- Timeline.

**Investigation Progress**
- Total evidence count.
- Reviewed evidence count.
- Investigation progress percentage.

The user should be able to navigate between evidence categories without losing investigation progress.

## 6.5 Evidence Generation System

Each mystery should contain different types of evidence.

### A. WhatsApp Conversations

Generate fictional chat conversations between relevant characters.

Each conversation should contain:

- Sender name.
- Receiver name.
- Message content.
- Timestamp.
- Message status (optional).
- Conversation participants.

Example:

Person A: Where were you last night?

Person B: I was at home. I already told the police.

Person A: Then why did you call him at 11:45 PM?

Person B: I don't want to discuss that.

The interface should display messages in a chat-style layout.

Important: All conversations are fictional and must not be represented as real communications.

### B. Image Evidence

Generate or provide fictional photographs such as:

- Crime scene photographs.
- Objects found at the scene.
- Suspect-related photographs.
- Fingerprint evidence illustrations.
- Location photographs.
- Relevant documents.

Each image must contain:

- Evidence ID.
- Image title.
- Description.
- Timestamp.
- Related suspect (if applicable).
- Investigation relevance.

For MVP, image generation should use a dedicated image-generation provider or generated placeholders.

### C. CCTV Evidence

CCTV evidence should contain:

- Camera ID.
- Camera location.
- Recording date.
- Recording start time.
- Recording end time.
- Footage description.
- Important timestamps.
- Observed individuals.
- Relevant observations.

Example:

Camera: Office Corridor Camera 02

Recording Time: 11:30 PM – 12:15 AM

Observation:
A person wearing a black jacket enters the office corridor at 11:47 PM.

At 12:05 AM, the same person leaves carrying a small bag.

MVP implementation:

Display CCTV footage as a fictional video transcript, timeline, or static footage-style evidence.

Future implementation:

Integrate AI video generation to provide actual playable footage.

### D. Documents

Generate fictional investigation documents such as:

- Police reports.
- Medical reports.
- Emails.
- Financial records.
- Call logs.
- Meeting records.
- Security access logs.

### E. Witness Statements

Each statement should include:

- Witness name.
- Statement.
- Timestamp.
- Location.
- Reliability indicator (optional).

### Evidence Structure

Every evidence item must have:

- Unique evidence ID.
- Evidence type.
- Evidence title.
- Evidence description.
- Content or asset URL.
- Timestamp.
- Related suspects.
- Investigation significance.
- Reviewed status.

## 6.6 Final Accusation

Purpose: Allow users to submit their investigation conclusion.

Required elements:

- Heading: "Who Do You Think Is the Culprit?"
- Display all suspects.
- Allow selection of exactly one suspect.
- Optional explanation text area.
- Submit Accusation button.

Validation:

- One suspect must be selected.
- User cannot submit multiple suspects.
- Once submitted, the accusation is locked for that investigation.

The backend evaluates the selected suspect against the stored actual culprit.

## 6.7 Results Page

Display the final investigation outcome.

If the answer is correct:

- Display success message.
- Reveal the culprit.
- Show the correct reasoning.
- Explain important evidence.

If the answer is incorrect:

- Display an unsuccessful investigation message.
- Reveal the actual culprit.
- Explain why the selected suspect was incorrect.
- Show the clues that identify the real culprit.

Both outcomes must display:

- Actual culprit.
- Culprit's motive.
- Opportunity.
- Method.
- Critical evidence.
- Explanation of red herrings.
- Complete chronological reconstruction.

Optional future feature:

- Investigation score.
- Time taken.
- Evidence reviewed.
- Detective rating.

---

# 7. AI PROMPT ENGINEERING

The backend must use structured prompts to ensure consistent generation.

## 7.1 Mystery Generation System Prompt

The following is the baseline instruction for Gemini.

"You are an expert fictional mystery writer and investigation designer.

Your task is to create a complete, logically consistent fictional mystery investigation based on the scenario provided by the user.

You must create exactly one culprit.

First establish the complete truth of the mystery, including the culprit, motive, opportunity, method, and actual sequence of events.

Then create the suspects, evidence, witness statements, conversations, and investigation timeline.

Every evidence item must be consistent with the established truth.

Include misleading clues that create reasonable suspicion toward other suspects, but ensure that the actual culprit can be identified through logical deduction.

Never create contradictory evidence.

Never reveal the actual culprit in the public investigation content.

Return the generated mystery in the requested structured JSON format.

All characters, communications, locations, and events must be fictional."

## 7.2 Structured AI Output

Gemini must return structured JSON following a predefined schema.

Conceptual structure:

{
  "case": {},
  "victim": {},
  "suspects": [],
  "timeline": [],
  "evidence": {
    "messages": [],
    "images": [],
    "cctv": [],
    "documents": [],
    "witnessStatements": []
  },
  "solution": {
    "culpritId": "",
    "motive": "",
    "method": "",
    "opportunity": "",
    "explanation": ""
  }
}

This is a conceptual structure. The implementation must define and validate a complete TypeScript/Zod schema.

The solution object must be stored privately and excluded from all public API responses until the accusation is submitted.

## 7.3 AI Response Validation

Every Gemini response must pass:

1. JSON parsing.
2. Schema validation.
3. Required field validation.
4. Unique suspect ID validation.
5. Culprit existence validation.
6. Evidence consistency validation.
7. Timeline validation.
8. Solution consistency validation.

If generation fails:

- Retry a limited number of times.
- Use structured error handling.
- Do not expose incomplete cases.
- Inform the frontend that generation failed.
- Allow the user to retry.

---

# 8. DATABASE DESIGN

MongoDB will be the primary database.

Use Mongoose models.

## 8.1 User Collection

For future authentication.

Fields:

- _id
- name
- email
- passwordHash
- createdAt
- updatedAt

## 8.2 Mystery Collection

Fields:

- _id
- caseId
- userId (optional)
- originalScenario
- category
- difficulty
- suspectCount
- status
- caseDetails
- victim
- suspects
- timeline
- evidence
- solution
- createdAt
- updatedAt

Important:

The solution field must be protected and must never be returned by public investigation endpoints.

## 8.3 Investigation Collection

Fields:

- _id
- caseId
- reviewedEvidenceIds
- selectedSuspectId
- userExplanation
- accusationSubmitted
- isCorrect
- startedAt
- submittedAt
- createdAt
- updatedAt

For guest users, an anonymous session or secure investigation token should identify the investigation.

## 8.4 Asset Collection (Optional)

Fields:

- _id
- caseId
- evidenceId
- assetType
- assetUrl
- mimeType
- generationStatus
- createdAt

Use an external object storage provider for actual image and video files. Do not store large binary files directly in MongoDB.

---

# 9. BACKEND API SPECIFICATION

Base URL:

/api/v1

## 9.1 Generate Mystery

POST /mysteries/generate

Request:

{
  "scenario": "A businessman was found dead in his office.",
  "category": "murder",
  "difficulty": "medium",
  "suspectCount": 4
}

Response:

{
  "success": true,
  "caseId": "CASE-12345",
  "message": "Mystery generated successfully"
}

## 9.2 Get Investigation

GET /mysteries/:caseId

Returns:

- Case details.
- Victim information.
- Suspects.
- Timeline.
- Evidence categories.

Must exclude the actual culprit and private solution.

## 9.3 Get Evidence

GET /mysteries/:caseId/evidence

Returns evidence items for the investigation.

Support optional filters:

- type
- suspectId
- search

## 9.4 Mark Evidence as Reviewed

POST /investigations/:caseId/evidence/:evidenceId/review

Records the user's reviewed evidence.

## 9.5 Submit Accusation

POST /investigations/:caseId/accusation

Request:

{
  "suspectId": "SUSPECT-02",
  "explanation": "The CCTV timestamp contradicts the suspect's statement."
}

Backend:

- Validates suspect ID.
- Checks investigation status.
- Prevents duplicate submissions.
- Compares the selected suspect against the stored culprit.
- Locks the investigation.
- Stores the result.

## 9.6 Get Investigation Results

GET /investigations/:caseId/result

Returns:

- Correct or incorrect result.
- Actual culprit.
- Motive.
- Method.
- Opportunity.
- Evidence explanation.
- Complete solution.

This endpoint must only become accessible after a valid accusation submission.

---

# 10. FRONTEND DESIGN GUIDELINES

## 10.1 Design Direction

The overall design should feel like a modern detective investigation platform.

Visual direction:

- Dark-themed interface.
- Cinematic mystery atmosphere.
- Professional dashboard layout.
- Subtle animations.
- Evidence-card-based interface.
- Clear visual hierarchy.

Suggested color palette:

- Background: #0B0D12
- Secondary Background: #141923
- Card Background: #1B2330
- Primary Accent: #D6A84F
- Primary Text: #F5F5F5
- Secondary Text: #A3AAB5
- Danger Accent: #C94B4B
- Success Accent: #4CAF83

Typography:

- Headings: modern display font.
- Body: Inter or similar readable sans-serif.

Avoid excessive animations, clutter, and unnecessary visual effects.

## 10.2 Investigation Interface

The investigation dashboard should prioritize usability.

Suggested layout:

Left Sidebar:
- Case overview.
- Suspects.
- Evidence categories.
- Investigation progress.

Main Content:
- Selected evidence.
- Evidence details.
- Messages, images, or documents.

Right Panel (optional):
- Suspect quick reference.
- Investigation notes.
- Timeline.

The interface must be responsive on desktop, tablet, and mobile.

---

# 11. APPLICATION WORKFLOW

The complete application workflow:

1. User opens the homepage.
2. User clicks Start Investigation.
3. User enters a scenario.
4. User selects category, difficulty, and suspect count.
5. Frontend submits the request.
6. Backend calls Gemini.
7. Gemini generates the mystery.
8. Backend validates the generated response.
9. Backend stores the case in MongoDB.
10. Frontend receives the case ID.
11. User enters the investigation dashboard.
12. User examines suspects and evidence.
13. User reviews messages, images, CCTV, and documents.
14. User identifies a potential culprit.
15. User submits the accusation.
16. Backend evaluates the accusation.
17. User receives the result.
18. The complete solution is revealed.

---

# 12. SECURITY REQUIREMENTS

Security is important because the mystery must not expose its solution prematurely.

Requirements:

1. Gemini API keys must remain on the backend.
2. Never expose API keys in frontend environment variables.
3. Validate all incoming requests.
4. Sanitize user-generated inputs.
5. Apply API rate limiting.
6. Restrict access to private solution data.
7. Prevent users from accessing the solution before submission.
8. Validate case ownership or anonymous session access.
9. Prevent duplicate accusation submissions.
10. Use secure environment variables.
11. Do not execute AI-generated code or scripts.
12. Escape or sanitize AI-generated content before rendering.
13. Limit input size and AI generation costs.

The backend must use separate public and private data serializers for mystery responses.

---

# 13. ERROR HANDLING

The application must handle:

- Empty scenario.
- Invalid input.
- Gemini API failure.
- Gemini response parsing failure.
- Invalid AI-generated JSON.
- MongoDB connection failure.
- Case not found.
- Invalid suspect selection.
- Duplicate accusation.
- Evidence not found.
- Network errors.
- Generation timeout.

All API responses should follow a consistent structure.

Success:

{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}

Failure:

{
  "success": false,
  "error": {
    "code": "GENERATION_FAILED",
    "message": "Unable to generate the mystery. Please try again."
  }
}

Never return internal stack traces or private AI solution data to the client.

---

# 14. NON-FUNCTIONAL REQUIREMENTS

## Performance

- Avoid unnecessary API calls.
- Use lazy loading for evidence assets.
- Optimize image sizes.
- Use pagination if evidence volume grows.
- Avoid blocking the UI during AI generation.
- Use appropriate loading and retry states.

## Reliability

- Validate every AI response.
- Store completed mysteries before exposing them.
- Preserve investigation progress.
- Handle API failures gracefully.

## Scalability

- Keep AI generation logic separate from API controllers.
- Separate evidence generation from mystery generation.
- Design asset storage independently.
- Use modular backend services.
- Support additional AI providers in the future.

## Maintainability

- Use TypeScript where possible.
- Maintain reusable React components.
- Follow a modular folder structure.
- Keep prompts separate from business logic.
- Use centralized error handling.
- Document API contracts.

---

# 15. PROJECT FOLDER STRUCTURE

Recommended structure:

ai-mystery-room/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── mystery/
│   │   │   ├── evidence/
│   │   │   └── suspects/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── CreateMystery/
│   │   │   ├── Investigation/
│   │   │   └── Results/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   │   ├── gemini/
│   │   │   ├── mystery/
│   │   │   ├── evidence/
│   │   │   └── investigation/
│   │   ├── prompts/
│   │   ├── validators/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── app.ts
│   └── package.json
│
├── docs/
│   ├── PRD.md
│   ├── TECHNICAL_SPEC.md
│   ├── API_SPEC.md
│   ├── DATABASE_SCHEMA.md
│   └── AI_PROMPTS.md
│
├── .gitignore
└── README.md

---

# 16. MVP DEVELOPMENT SCOPE

The initial version must focus on delivering a complete, working investigation experience.

## Phase 1: Foundation

- Initialize MERN project.
- Configure MongoDB.
- Configure Gemini API.
- Establish frontend and backend communication.
- Implement application routing.
- Create shared UI components.

## Phase 2: Mystery Generation

- Implement scenario input.
- Implement Gemini integration.
- Generate case storyline.
- Generate suspects.
- Establish actual culprit.
- Generate investigation timeline.
- Generate structured evidence.
- Validate AI responses.
- Save generated cases.

## Phase 3: Investigation Experience

- Implement investigation dashboard.
- Display suspects.
- Implement evidence categories.
- Display WhatsApp conversations.
- Display image evidence.
- Display CCTV transcripts.
- Display documents and witness statements.
- Implement evidence review tracking.

## Phase 4: Accusation and Results

- Implement suspect selection.
- Implement accusation submission.
- Evaluate the selected suspect.
- Reveal the solution.
- Explain evidence and reasoning.
- Lock completed investigations.

## Phase 5: Testing and Refinement

- Test mystery generation.
- Test AI consistency.
- Test solution protection.
- Test API validation.
- Test responsive layouts.
- Test error handling.
- Fix bugs.

---

# 17. ACCEPTANCE CRITERIA

The MVP is considered complete only when the following conditions are satisfied.

### Mystery Creation

- [ ] User can enter a scenario.
- [ ] User can select mystery category.
- [ ] User can select difficulty.
- [ ] User can select suspect count.
- [ ] Backend successfully calls Gemini.
- [ ] A complete mystery is generated.
- [ ] Exactly one culprit is established.
- [ ] Generated content passes schema validation.

### Investigation

- [ ] User can access the generated investigation.
- [ ] All suspects are displayed.
- [ ] Evidence is organized into categories.
- [ ] User can view individual evidence items.
- [ ] Evidence content is consistent with the storyline.
- [ ] Investigation progress is tracked.

### Accusation

- [ ] User can select one suspect.
- [ ] User can submit an accusation.
- [ ] Backend correctly evaluates the selection.
- [ ] Duplicate submissions are prevented.
- [ ] Actual culprit is not exposed before submission.

### Results

- [ ] Correct and incorrect answers are handled.
- [ ] Actual culprit is revealed after submission.
- [ ] Motive and method are explained.
- [ ] Important evidence is explained.
- [ ] Red herrings are explained.

### General

- [ ] Application is responsive.
- [ ] API errors are handled.
- [ ] Gemini keys are protected.
- [ ] Database records are stored correctly.
- [ ] No critical functionality depends on mock data in the completed MVP.

---

# 18. FUTURE ENHANCEMENTS

These features are not mandatory for MVP development.

1. Actual AI-generated CCTV videos.
2. AI-generated crime scene photographs.
3. AI-generated voice recordings.
4. Audio interrogation sessions.
5. Interactive suspect interrogations.
6. AI detective assistant that answers investigation-related questions without revealing the solution.
7. Multiplayer investigations.
8. Leaderboards.
9. Detective rankings and achievements.
10. User authentication and profiles.
11. Mystery sharing.
12. Daily mystery challenges.
13. Procedural difficulty adjustment.
14. Investigation hints.
15. Timed investigation mode.

---

# 19. CRITICAL DEVELOPMENT RULES FOR CODEX

This section defines mandatory development behavior.

1. This document is the primary source of truth for the project.
2. Follow the requirements defined in this specification.
3. Do not introduce unrelated features without approval.
4. Do not replace the MERN stack.
5. Use Gemini as the primary AI reasoning and mystery-generation provider.
6. Keep AI prompts separate from controllers.
7. Use structured JSON outputs and validate them before saving.
8. Never expose the culprit or solution before accusation submission.
9. Exactly one culprit must exist per mystery.
10. Never use inconsistent suspect identities or timelines.
11. Do not hardcode mystery content as the primary implementation.
12. Mock data may be used temporarily during UI development but must be replaced by actual backend integration.
13. Implement reusable components.
14. Maintain clean, modular, maintainable code.
15. Follow the defined API contracts.
16. Follow the defined database structure.
17. Implement proper loading, error, empty, and success states.
18. Test each major feature before moving to the next development phase.
19. Do not silently change existing functionality.
20. If a requirement is ambiguous or conflicts with another requirement, document the issue and request clarification rather than inventing a major product decision.
21. Update the relevant technical documentation whenever an approved implementation decision changes.
22. Do not mark a feature complete until its acceptance criteria pass.

---

# 20. DEFINITION OF DONE

A feature is considered complete when:

- Frontend implementation is functional.
- Backend implementation is functional.
- API integration works.
- Database operations work where applicable.
- Input validation is implemented.
- Error handling is implemented.
- Security requirements are respected.
- Relevant acceptance criteria pass.
- No critical console or server errors remain.
- Documentation is updated.

The project is complete when a user can enter an original story, receive a fully generated mystery, investigate its evidence, identify a suspect, submit an accusation, and receive the correct explanation.
 
---

# FINAL PRODUCT VISION

AI Mystery Room should feel like an interactive detective investigation rather than a conventional AI chatbot.

The AI should act as the mystery creator behind the scenes, while the user experiences the role of a detective.

Every case should feel like a carefully constructed investigation with believable suspects, meaningful evidence, hidden clues, and a logically deducible culprit.

**The core product principle: Every mystery must have a predetermined truth, and every piece of evidence must contribute to discovering that truth.