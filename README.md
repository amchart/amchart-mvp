# Amchart: A Blockchain Solution for EHR using Hyperledger Sawtooth

### Introduction

Read more at https://amchart.io

AMCHART is a universal electronic health record (EHR) that's poised to change the way we access patient and provider records. It utilizes blockchain technology to eliminate the current problems with record systems, improving portability and migration of information, as well as transparency and accessibility. Our main objectives are for patients to have full control over their health records, and providers to have increased confidence that blockchain technology can provide to finally make the system whole.

<iframe width="555" height="312" src="https://www.youtube.com/embed/IrGNT80iMMA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Project Structure

* ServerSetup: Docker containers for running a local Sawtooth cluster
* TransactionProcessor: The Amchart smart contract for saving EHR to the blockchain
* config: application-wide settings
* common: shared libs for client and server apps

### Is this the entire codebase?

We're publishing components of the Amchart platform as they evolve and mature. We're still building the MVP, so significant sections of code won't immediately be published here. We plan to add code to this public repo as new components are tested and deployed to the test platform.


