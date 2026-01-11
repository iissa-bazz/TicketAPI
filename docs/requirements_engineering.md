# Requirements Engineering

A Product Owner asks for an urgent new feature for the Fleet Portal to satisfy new customer requirements. What do you do? 


- The stakeholders involved are the support team (ST), the (Scrum) product owner (PO), and you (software engineer). 
- Explain how you would approach this situation, and discuss briefly: 
    - **How you clarify the real problem and business goal** 
      - What problem does the feature solve and what is the target consumer of this product?
      - What specific customer problem triggered this request?
      - What's the actual business impact if we don't deliver this (lost revenue, contract obligations)?
    - **How you work with the stakeholders to gather requirements** 
      - Gather inputs:
        - PO: business priorities and success metrics
        - ST: customer pain points and edge cases
        - Me: technical feasibility and constraints
      - Formalize requirements:
        - User Stories with Acceptance Criteria
        - Use Case Analysis, Impact on Domain Model
        - Non-functional requirements: performance, security dependencies/constraints on existing systems
    - **How you decide what to build first (MVP vs. later improvements)** 
      - Determine structural dependencies (Feature Hierarchy from use case analysis)
      - Apply the MoSCoW method (with PO):
        - Must have: Minimum to solve the problem
        - Should have: Significantly improves the solution
        - Could have: Nice additions
        - Won't have: Explicitly deferred
    - **How you translate the idea into an implementation plan** 
      - Delivery Artifacts:
        - Feature Hierarchy -> Roadmap/Release Timeline
        - User Stories  -> Backlog 
        - Acceptance Criteria -> Test Cases
      - Create technical design document (architecture, API contracts, data models)
      - Estimate effort/time frame and identify unknowns/risks
    - **How you validate that the feature delivers business value**
      - **Pre-launch:**
        - Validate user requirements (acceptance criteria met through testing)
        - Verify technical requirements (performance, security, integration)
        - Confirm alignment with business priorities (with PO)
      - **Post-launch:**
        - Establish key metrics (with PO):
          - Quantitative: Support ticket reduction, feature adoption rate, user engagement metrics
          - Qualitative: Customer satisfaction scores, direct feedback
        - Review metrics and refine iteratively