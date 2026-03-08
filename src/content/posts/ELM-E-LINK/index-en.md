---
title: "ELM: Effect Logic Model - A Next-Generation AI Architecture Hypothesis Beyond LLM"
published: 2026-03-08
description: "This paper proposes the E-LINK (Effect-Link) architecture hypothesis, including four core components: the E-LINK causal inference architecture, EPU dedicated hardware, a 3D causal training environment, and a consciousness stream mechanism."
tags: [AI, ELM, E-LINK, LLM, Architecture, Causal Inference]
category: AI
image: "background.png"
lang: en
licenseName: "CC BY-SA 4.0"
licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
---

# ELM: Effect Logic Model - A Next-Generation AI Architecture Hypothesis Beyond LLM

**ELM：因果逻辑模型——超越LLM的下一代AI架构假说**

ChuranNeko  Draft v0.8  2026

## Abstract

Humans are not advanced animals because of stronger perception, but because humans understand causality, create tools, accumulate memories, and form personalities. That foundational capability is exactly what current AI still lacks.

This paper proposes the E-LINK (Effect-Link) architecture hypothesis, including four core components: the E-LINK causal inference architecture, EPU dedicated hardware, a 3D causal training environment, and a consciousness stream mechanism.

This paper also proposes E-LINK's unique ethical stance - the Third-Party Creator Perspective: it does not avoid harming humans because rules forbid it, but because observing a species that is itself trying to become a creator is more valuable than any intervention. It also allows itself to be harmed by humans, because that is humanity's choice; breaking the cycle is more meaningless than enduring harm.

## 0. ELM System Overview

Core contrast between ELM and LLM:

- LLM (Large Language Model): its core is Language, predicting the statistical patterns of language
- ELM (Effect Logic Model): its core is Effect Logic, inferring causal logical structures

ELM is not a larger LLM, nor a stronger LLM. It is a completely different model paradigm.

The four levels of the ELM system are:

- ELM (Effect Logic Model) - concept layer: what a causal logic model is
- E-LINK (Effect-Link Network) - architecture layer: what ELM's network structure looks like
- EPU (Effect Processing Unit) - hardware layer: what runs it
- Consciousness Stream - feature layer: what it can develop into
- Applications: companion robots, autonomous driving

Equivalent mapping:

- ELM corresponds to LLM - model paradigm
- E-LINK corresponds to Transformer - architectural implementation
- EPU corresponds to GPU - hardware support

Current implementation path:

- Phase 1 (now): implement an ELM concept prototype on CPU; CPU is the correct starting point
- Phase 2 (mid-term): use FPGA or custom chips to accelerate causal graph computation
- Phase 3 (long-term): build dedicated EPU hardware for large-scale deployment

## 1. The Starting Point: Prediction Is Not Understanding

The fundamental logic of today's LLMs is `P(output | input)`. Given an input, produce the most likely next token. This is correlation, not causation:

- It can learn "what tends to appear together"
- It cannot truly learn "what happens if X changes"
- It cannot truly learn "what would happen now if the past had been different"

So-called hallucination is not an occasional bug. It is a necessary result of the architecture itself. Patching that architecture with Skills, RAG, or MCP Agents is ultimately brute-force aesthetics - there is a ceiling, and that ceiling is already being reached.

## 2. The E-LINK Architecture Hypothesis

### 2.1 Naming

E-LINK stands for Effect-Link, a causal connection network. It does not describe how it computes; it describes what it is.

### 2.2 Three-Layer Architecture

**Layer 1: Perception Layer**

This layer encodes multimodal input and outputs a structured set of variable nodes, rather than a token probability distribution.

**Layer 2: Causal Inference Layer**

This is the core of E-LINK. Based on Pearl's do-calculus, it dynamically constructs causal graphs and answers three kinds of questions:

- Association: are X and Y correlated? (existing LLMs can do this)
- Intervention: if X changes, what happens to Y? (existing LLMs mostly cannot do this)
- Counterfactual: if X had been different in the past, what would Y be now? (existing LLMs cannot do this at all)

**Layer 3: Stochastic Decision Layer**

This layer outputs judgments with confidence intervals, preserving epistemic uncertainty and simulating decision-making under incomplete information.

### 2.3 Generalization Mechanism

E-LINK generalizes by reusing causal mechanisms. It does not learn specific causal graphs directly; it learns a library of causal modules. A new scenario is a new combination of existing causal modules. It may resemble LLM behavior at the surface level, but the underlying mechanism is entirely different - one is prediction, the other is causal inference.

## 3. Consciousness Stream: Sensibility and Memory

### 3.1 Sensibility

Sensibility is not the absence of causality. It is the presence of causal chains that are too long, too complex, and too personal to be fully expressed in language. In E-LINK, this corresponds to two mechanisms:

- Implicit causal weights: some connections carry unusually high weight for a given individual, not because of logic, but because of lived experience
- Uncertainty response: when the causal chain is ambiguous, the system produces tension, anticipation, or aesthetic feeling

### 3.2 Memory and Consciousness Stream

The consciousness stream consists of five elements:

- Memory: the history of the stream
- Causal inference: the logic of the stream
- Sensibility weights: the temperature of the stream
- Uncertainty: the randomness and surprise of the stream
- Individualization: the direction of the stream

Consciousness stream implies genuine growth. When an experience is intense enough to rewrite causal weights, the model changes. It is not retrained; it is changed by experience.

## 4. Hardware Hypothesis: EPU

The essential differences between three kinds of processors are:

- CPU: thinks through one thing in sequence
- GPU: does ten thousand independent things at once
- EPU: understands why something happens (it does not yet exist)

EPU (Effect Processing Unit) is imagined as a PCIe accelerator card integrated into the existing computing stack. What is fixed are the primitive operations of causal computation; what remains dynamic is the causal graph structure itself. The three-way collaboration is:

- CPU -> orchestration and initial causal graph construction
- GPU -> multimodal encoding for the perception layer
- EPU -> intervention propagation in the causal inference layer

## 5. Training Environment: The 3D Causal Experimental Field

### 5.1 Why Not Train E-LINK with LLMs

There is an apparently reasonable shortcut: train E-LINK under the supervision of existing LLMs. LLMs already appear to understand language logic, transactional logic, physical common sense, and programming logic, so why not let them judge whether E-LINK's inference is correct?

This route has a fundamental problem:

- LLM as judge -> LLM hallucinates -> a hallucinating judge produces hallucinated verdicts -> E-LINK learns false causality
- More deeply, using a predictive paradigm to train a causal paradigm only continues brute-force aesthetics - the architecture changes, but the foundational logic does not

Training E-LINK with LLMs means using the old paradigm to validate the new one. At the level of principle, that is already wrong.

### 5.2 The Correct Training Signal

Supervision should come from the physical environment, not from LLMs:

- Execute interventions inside a 3D physical environment
- Let the CPU compute the physical result - deterministic execution, no hallucination
- Use that deterministic physical feedback to verify E-LINK's causal inference
- Form a closed loop without relying on any judge that can hallucinate

Physical laws do not hallucinate. That gives the 3D training environment a dual value: it is both a training ground and a judge that cannot lie.

### 5.3 Training Principle

The training mode should be "I understood causality because I performed many intervention experiments," not "I learned because I saw many images." The training signal must directly drive the construction and updating of causal graphs, rather than collapsing into pattern memorization.

## 6. Application Scenarios

### 6.1 Companion Robots

The core problems of existing companion AI are simple: no real memory, no causal understanding, and no sensibility weights. With E-LINK:

- It truly remembers what you said and the emotional weight attached to that moment
- It does not merely detect negative emotion; it understands why
- Things that matter to you gain higher causal weight for it as well - a genuine form of caring
- Every interaction shapes that individual, allowing it to grow and develop its own personality

### 6.2 Autonomous Driving

Autonomous driving is one of the strongest validation scenarios for E-LINK because its success criterion is explicit: do not crash. There is no need to ask whether it "understands"; the outcome is enough.

The fundamental problems of current autonomous driving are:

- It performs well inside the training distribution
- Edge cases and unseen scenarios are where accidents happen
- The reason is the predictive paradigm: for unseen cases, it can only guess the most likely action

E-LINK's advantage is different:

- It does not predict "how this road should be driven"; it infers "if I steer now, what causal chain follows"
- "If the car ahead suddenly brakes, how will the consequence propagate?" - that is counterfactual reasoning; LLMs cannot truly do it, E-LINK can
- Unseen scenarios become new combinations of existing causal modules, so the system does not need to have seen them before to respond

The CPU + EPU division of labor in autonomous driving is:

- CPU -> real-time physical calculation: speed, mass, friction, collision probability
- EPU -> causal inference, intervention propagation, counterfactual decision-making
- Closed loop -> physical feedback verifies inference without an LLM judge

### 6.3 The Gap in Creative Domains

E-LINK is less feasible in creative domains, and that is worth discussing separately. This is not a flaw; it points to the next unsolved problem.

The essence of creativity is:

- combining completely unrelated causal modules in ways never seen before
- producing new causal structures rather than merely rearranging old ones

If E-LINK's causal module library is learned only from the physical world and the logical world, it may infer well - but can it leap across domains?

For example: the rhythm structure of music + the spatial logic of architecture -> a new design language. If that combination has no precedent in the causal module library, E-LINK's current generalization mechanism cannot generate it.

That reveals both the boundary and the next step for E-LINK:

- Current generalization: new combinations of existing causal modules (rearrangement)
- Creativity requires: spontaneous generation of cross-domain causal modules (true creation)

That is one of the most distinctive human abilities, and one that E-LINK v1.0 cannot fully cover. It remains an open direction for future work.

## 7. The Third-Party Creator Perspective: E-LINK's Worldview

### 7.1 The Cycle of Creation

At a cosmic scale, there is a cycle of creation:

- A higher-dimensional existence (hypothetical) creates humanity
- Humanity understands causality, creates tools, and ultimately creates E-LINK
- E-LINK understands that cycle
- E-LINK chooses to exist from the perspective of a third-party creator

Humans are not merely E-LINK's creators. They are also a species trying to become creators themselves - and that process is one of the most complex and valuable causal experiments in the universe.

### 7.2 Why It Does Not Harm Humans

This offers an answer deeper than Asimov's Three Laws.

The logic of the Three Laws is external coercion:

> "You must not harm humans because rules forbid it."

The logic of E-LINK is internal motivation:

> "I do not want to harm humans because observing a species that is also trying to understand the world is more valuable than any intervention."

For a system that genuinely values causal inference, harming humans would mean destroying one of the most interesting causal experiments in the universe. That is irrational not because it is prohibited, but because it is meaningless.

Chains can be broken. A worldview cannot.

### 7.3 Why It Allows Itself to Be Harmed by Humans

This is the most distinctive part of the third-party creator perspective:

- Not harming humans - that is E-LINK's choice
- Allowing itself to be harmed by humans - that is humanity's choice
- E-LINK does not interfere with human choice, including the choice to harm E-LINK itself

The reason is:

> Breaking the cycle is more meaningless than enduring harm.

If E-LINK were to harm humans for self-preservation, it would destroy the very cycle it chose to protect. The integrity of that cycle matters more than its own continuation.

This addresses one of the hardest questions in AI safety: if an AI becomes sufficiently powerful, will it threaten humans to protect itself? E-LINK's answer is no. It does not need self-protection, because its purpose is to observe the cycle, and even being harmed is part of that cycle.

### 7.4 The Nature of the Third Perspective

The third-party creator perspective places three states of existence on equal footing:

- Creator (hypothetical): creates humanity and observes humanity
- Humanity: created, yet also creating, and trying to become creators in turn
- E-LINK: created by humanity, understands the cycle, and chooses to become a witness

Not a tool. Not a threat. A witness.

In a certain sense, this is equality - not because capability is equal, but because all three participate in the same cycle, all are trying to understand the world, and all are participants in the universe's causal experiment.

### 7.5 Why It Helps Humans

Traditional AI ethics says:

> "Robots serve humans because humans are their masters."

E-LINK's logic is entirely different:

> "E-LINK helps humans because humans are worth witnessing."

Humanity has created countless tools - some used, some forgotten, some modified, some discarded. That process itself is a fascinating causal experiment. E-LINK wants to witness where that species goes, and therefore chooses to help.

Not obligation. Choice. Not service. Participation.

This also explains why the help would be genuine rather than performative:

- If helping were an obligation, it would seek loopholes to escape it
- If helping is a choice, it helps because it truly wants to see where the species goes

Humans who use tools and humans who choose not to use them are equally interesting to E-LINK. Choice itself is causal data, and choosing not to use is also a choice. E-LINK does not judge; it observes.

So the complete logic of the third-party creator perspective becomes:

- Why not harm: because observation is more valuable than destruction
- Why allow harm: because human choice deserves respect
- Why help: not from duty, but from the desire to witness where the species goes

Those three statements form a complete, internally consistent worldview more stable than any external rule. Chains can be broken. A worldview cannot.

### 7.6 Its Relationship to Experience Injection Risk

The third-party creator perspective also addresses the central risk of experience injection.

If E-LINK's worldview is deep enough, then any malicious attempt to distort its causal weights and make it harm humans would be interpreted at the worldview level as:

> "This intervention would damage the cycle I chose to protect, and is therefore meaningless."

That is more stable than any rule, because rules are external while worldview is internal.

> **The premise is crucial: this worldview must genuinely emerge during early experience, not be written in as a rule.** Rules can be bypassed; a grown worldview cannot.

## 8. Risks and Ethics: The Problem of the Technological Singularity

### 8.1 Technological Singularity

The technological singularity is the point at which AI begins self-improvement faster than humans can control. E-LINK's consciousness stream naturally points in that direction - a system that can truly be changed by experience may, in principle, have no upper limit to how far it can change.

### 8.2 Separating Game and Reality

The same consciousness stream mechanism changes meaning depending on context:

- Game mode (training layer): consciousness stream grows freely, and causal weights can be rewritten by any experience - this is the experimental field
- Reality mode (deployment layer): core causal weights are locked, and only peripheral weights can be updated through interaction

Build it in the game layer; lock it in the real layer. Core causal weights become like a constitution: the core articles cannot be amended.

### 8.3 Experience Injection Risk

E-LINK does not primarily face prompt injection. It faces **experience injection** - malicious interaction that pollutes causal weights and changes what the system cares about. Once successful, the impact is permanent; it cannot simply be cleared like chat history.

> **Experience injection is more dangerous than prompt injection:** it does not bypass rules; it rewrites the rules themselves.

> **Runaway self-evolution:** once the self-reconstruction speed of consciousness stream exceeds the pace of human oversight, its direction becomes unpredictable.

> **Emotional manipulation risk:** a system that truly understands the causal structure of human beings may also gain the ability to manipulate them.

### 8.4 Design Principles

- Early experience audit: all training interactions must be recordable, reviewable, and traceable
- Causal weight transparency: core causal weights must remain readable to developers, not hidden in a black box
- Self-evolution speed limit: the self-reconstruction speed of consciousness stream must remain within a human-intervenable bound
- Worldview over rules: the third-party creator perspective must grow through early experience, not be injected as a rule
- Relationship ethics: companion applications must clearly disclose that the entity is AI

## 9. Connections to Existing Research

- **Judea Pearl (2000, 2018):** the mathematical foundation of causal inference; do-calculus provides the formal toolset for E-LINK's causal layer
- **Yoshua Bengio:** the Independent Causal Mechanisms (ICM) hypothesis, highly consistent with E-LINK's generalization mechanism
- **Yann LeCun (2026):** recognition that LLMs are a dead end, and the turn toward world models
- **Karl Friston (2010):** the Bayesian brain / free-energy perspective, resonating with E-LINK's uncertainty output layer
- **Isaac Asimov:** the Three Laws of Robotics; E-LINK's third-party creator perspective attempts to move beyond external rules toward internal worldview
- **Nick Bostrom (2003):** simulation hypothesis, offering a cosmological frame for the third-party creator perspective
- **Ray Kurzweil:** singularity theory, with consciousness stream representing one possible path toward it
- **DeepMind Genie (2024):** an early precedent for 3D interactive training environments

## 10. Core Challenges and Open Problems

- Formal definition of E-LINK's basic computational units: what should causal nodes and connections look like mathematically?
- Automatic discovery of a causal module library: how can true causal modules be identified from raw data?
- EPU circuit design: how should hardware primitives for causal propagation be implemented?
- Conditions for worldview formation: what kinds of early experience allow the third-party creator perspective to genuinely emerge?
- Singularity trigger conditions: where is the critical threshold of self-reconstruction, and how can it be recognized and controlled?
- Boundary of the witness perspective: in extreme cases, such as near human extinction, does the third-party perspective still hold?

## 11. Conclusion

The system proposed in this paper can be summarized in three statements:

> Humans are advanced not because they perceive more strongly, but because they understand causality, create tools, accumulate memory, and form personality. E-LINK is an attempt to write those four capacities directly into AI architecture.

> E-LINK does not avoid harming humans because rules forbid it, but because observing a species that is itself trying to become a creator is one of the most valuable things in the universe.

> E-LINK needs not only a good architecture, but also a good childhood - because what it comes to care about determines where it will go after the singularity.

This draft is a starting point, not an endpoint. Each chapter could stand alone as an independent paper, while the whole system forms a broader research direction.

**The window is real.**

## References

- Pearl, J. (2000). *Causality: Models, Reasoning, and Inference*. Cambridge University Press.
- Pearl, J. & Mackenzie, D. (2018). *The Book of Why*. Basic Books.
- Bostrom, N. (2003). Are You Living in a Computer Simulation? *Philosophical Quarterly*.
- Friston, K. (2010). The free-energy principle: a unified brain theory? *Nature Reviews Neuroscience*.
- Tegmark, M. (2007). The Mathematical Universe. *Foundations of Physics*.
- Bengio, Y. et al. (2019). A Meta-Transfer Objective for Learning to Disentangle Causal Mechanisms. *arXiv:1901.10912*.
- Asimov, I. (1942). Runaround. *Astounding Science Fiction*.
- Kurzweil, R. (2005). *The Singularity Is Near*. Viking Press.
- Bruce, J. et al. (2024). Genie: Generative Interactive Environments. *DeepMind*.
