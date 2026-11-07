---
title: Code is cheap. The process is the job - the new developer paradigm
date: 2026-11-08
description: As AI generates more of the code, the engineer's day shifts from writing to gating, briefing, verifying and releasing. What that life looks like now, and the skills worth levelling up to thrive in it.
tags: [ai, engineering, career]
cover: /img/covers/process-engineer.svg
ogImage: /img/covers/process-engineer-og.png
---

For most of the industry's history, the unit of engineering work was the line of code. You were hired to write it well, and the rest of the profession, from review practices to seniority ladders, was organised around that fact.

AI coding assistants are quietly changing the premise. When a few hundred lines can be drafted in a minute, authorship stops being the constraint. The constraint becomes **confidence**: knowing, quickly and cheaply, that a change solves the right problem, does what was intended and nothing else, and will behave in production.

That moves the centre of gravity of the role. The developer is becoming less the author of each change and more the engineer of the *process* by which changes are conceived, produced, verified, released and operated. "Process engineer" is my shorthand rather than an established title, but the shift it describes is already visible in how capable teams work.

This post is about what that does to an engineer's working life, and what is worth getting better at.

## How the day is changing

A typical day used to be organised around the keyboard: pick up a ticket, write the code, write some tests, open a pull request, wait for review. Today, on a team that uses assistants well, the same day looks different.

| Before | Now |
| --- | --- |
| Start from a ticket and begin coding | Start by sharpening the brief: what, why, for whom, what is out of scope |
| Write the implementation yourself | Hand parts of it to an assistant or agent, often several in parallel |
| Read your own code as you write it | Read generated code you did not write, quickly and critically |
| Write tests after, or alongside | Decide what evidence would convince you before anything is generated |
| Wait for a peer to read the diff | Rely on automated gates, and read closely only where the risk demands it |
| Merge and move on | Release gradually, watch behaviour, and be ready to roll back |

Notice what has happened to the shape of the work. There is less time producing, and far more time **deciding**: what to build, what to trust, what to block and what to let through. The engineer is increasingly the person standing at the gates of the process.

## From author to gatekeeper, in the good sense

"Gatekeeper" can sound like a bottleneck, the person who says no. That is not the idea. A gate, in this sense, is a condition a change must satisfy before it moves to the next stage, and the engineer's job is to **design gates that make speed safe**.

Good gates share a few traits:

- **Fast.** A gate that takes an hour will be bypassed.
- **Objective.** Pass or fail should not depend on who is looking.
- **Automated wherever possible.** Human attention is the scarcest resource in the loop.
- **Proportionate.** Scrutiny should scale with risk, not apply uniformly.
- **Owned.** Someone is accountable for each gate, and for what it lets through.

The payoff is trust. Every change that passes strong gates earns the team a little more autonomy to hand to agents. Weak gates do the opposite: they force people back to reading every line, which is the one thing that no longer scales.

## The loop at the centre of the job

Beneath the changed day sits a repeating cycle. The engineer's work concentrates at the human-led steps, and the craft lies in making the automated ones strong enough to run fast without being reckless.

![The process engineer's loop: intent, generate, verify, verdict, release and observe, repeating](/img/diagrams/process-loop-v2.svg)

Intent decides what is worth building. Verdict decides whether the evidence is good enough for the risk. Observe feeds what is learned in production back into the next intent. Generation, verification and release can be fast precisely because people have invested in the steps around them.

## What we are starting to do

A set of new habits is emerging, often without anyone naming them.

**Briefing instead of coding.** Writing a precise brief, with examples and edge cases, has become one of the highest-leverage activities. Ambiguous intent produces fluent code that solves the wrong problem, quickly.

**Supervising parallel work.** Instead of finishing one task at a time, engineers increasingly direct several streams at once, which makes decomposition and context-setting central skills.

**Reading faster and more critically.** Most of the code you handle now is code you did not write. The ability to read it, spot what it assumes and notice what is missing is worth more than ever.

**Triaging by risk.** Not everything deserves the same attention. Experienced engineers sort changes by consequence, and spend care where mistakes are expensive or irreversible.

| Risk | Typical examples | What it needs |
| --- | --- | --- |
| Low | Documentation, copy, internal tooling | Automated checks pass |
| Medium | Ordinary feature work | Intent and test evidence reviewed, code sampled |
| High | Authentication, payments, data migrations, anything irreversible | Line-by-line reading, a second reviewer, staged rollout |

**Treating tests as the specification.** Tests that describe behaviour become the contract the generated code has to satisfy. One caution: if the same assistant writes the code and the tests, the tests may only encode its own assumptions, so the ones guarding critical behaviour deserve independent authorship.

**Releasing defensively.** Flags, canary releases and rehearsed rollbacks make mistakes survivable, which lets scrutiny up front be lighter.

**Keeping context alive.** Conventions, design decisions and the reasons behind them have to be written down, for teammates and for the agents that rely on them.

## Where to level up

If the work is shifting, the skills worth investing in shift with it. Here is a map of what to strengthen, and how to practise each.

| Skill | Why it matters now | How to practise |
| --- | --- | --- |
| **Problem framing and specification** | Intent is the input to everything else | Write a one-page brief before every non-trivial change, then compare the result with it |
| **Systems thinking and architecture** | Boundaries and contracts decide how safely work can be delegated | Draw the data flow and failure points of a system you own, and look for where a mistake could spread |
| **Testing and verification design** | Evidence is the new currency | Practise writing tests that fail for the right reasons, and try breaking your own suite |
| **Fast, critical code reading** | Most code is now unfamiliar code | Review a diff with a timer, then list what it assumed and what it left out |
| **Production engineering** | Release, observability and rollback are where trust is earned | Add the one piece of visibility you lack, and rehearse a rollback |
| **Security and risk judgement** | Plausible code can be insecure code | Learn the common failure classes, and make a habit of asking how a change could be abused |
| **Cost and economics** | Usage-based tooling and inference show up on real budgets | Learn what a feature costs per request, and set a budget for it |
| **Communication and decision-making** | Gates need owners who can explain a verdict | Write short decision notes: what was chosen, what was rejected, and why |
| **Learning with AI, not instead of it** | Skills fade when thinking is outsourced | Ask for explanations and trade-offs, and keep one task a week that you do by hand |

The last row matters more than it looks. Judging evidence depends on understanding what the evidence is about, and directing an agent depends on knowing what good looks like. Engineers who stop reading and writing code entirely lose the capacity to assess what replaced it, the same dynamic as [cognitive debt](/ai-cognitive-debt/) arriving by a different route.

## Closing thought

The line of code was never really the point. It was the visible proof of something less visible: judgement about what to build, how to make it safe, and when to let it go.

Now that code is cheap, that judgement is simply the job, laid bare. The engineers who thrive will be the ones who frame the problem well, design the gates, read the evidence, and stand behind what ships.

> Generation is cheap. Trust is the product.
