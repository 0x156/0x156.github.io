---
title: "Zero-Knowledge Machine Learning: What It Proves and What It Doesn't"
description: "A practical breakdown of zkML — proving that an inference was computed honestly, what current proving systems actually guarantee, and the engineering cliffs you hit in production."
pubDate: 2026-03-18
tags:
  - zkml
  - ai
  - web3
  - zk
heroImage: ../../assets/zero-knowledge-ml-proofs-hero.svg
---

Zero-knowledge machine learning is in the phase where the papers outnumber the deployments by an order of magnitude, and most of the deployments are demos. It is still worth understanding, because the design space is narrow enough that the shape of the production systems is already legible.

The core primitive is simple: given a model `f` and an input `x`, produce a proof `π` such that a verifier, knowing only the model commitment and the output `y`, can verify that `y = f(x)` was computed correctly — without re-running the model and, if needed, without learning `x`.

## What the proof actually gives you

A zkML proof gives you three properties, in decreasing order of usefulness.

First, **integrity of execution**. The verifier learns that the output was produced by the specific committed model weights applied to some input that satisfies the constraints you encoded. This is the property everyone actually cares about: it lets you trust inference from a remote party without trusting the party.

Second, **input or weight privacy**. You can hide the input (prove classification on encrypted medical data), hide the weights (prove a model's output without revealing the model), or both. Most "zkML privacy" arguments conflate these, which matters because the constructions differ.

Third, **model commitment as a public artifact**. Once you commit to weights, you can be held to them. This is the property that will matter most for regulated ML, and it is the one that requires the least protocol novelty — you can get 80% of it with a Merkle root of the weights and a signed claim.

What the proof does *not* give you is any statement about the model's correctness, fairness, safety, or robustness. Proving that you ran the model you committed to is orthogonal to proving that the model does anything useful. This distinction gets collapsed in marketing and should not be collapsed in engineering.

## The cliff

The cost model is brutal and dominates every real design. Proving a feed-forward pass over a small convolutional model is tractable. Proving a pass over a 7B-parameter transformer is not, today, in anything resembling production latency. The constraint count grows with the number of non-linear operations — softmax, GELU, layer norm — and with the sheer scale of matrix multiplication. The best general-purpose systems (Halo2-based zkML frameworks, lookup-argument approaches, GKR-style sumcheck provers) are shaving orders of magnitude off, but the starting point is so high that "orders of magnitude" is not yet enough.

There are two practical responses. The first is to prove less: commit to the model and prove only that a specific small operation was executed (a final classification head, a routing decision, an adversarial check). The second is to prove over quantized and heavily simplified models, accepting a meaningful accuracy loss in exchange for a feasible proof size. Most production zkML will live in the first bucket for the foreseeable future.

## Where it fits

The use cases that actually pay for the overhead are ones where the alternative is trusting a centralized party. On-chain oracles that need to prove a model was run honestly. Rollup-based AI services where the sequencer cannot be assumed to be honest. Regulatory contexts where you have to prove that a decision was made by a specific, committed model. Fraud-proof-style escape hatches for optimistic AI systems.

Everything else — privacy-preserving inference as a general consumer product, verifiable training, proof-carrying fine-tunes — is further out than the current literature suggests. The right mental model is that zkML is a niche but important component in trust-minimized systems, not a general-purpose replacement for running inference locally.
