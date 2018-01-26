# Amchart: A Blockchain Solution for EHR using Hyperledger Sawtooth

### Introduction

Read more at https://amchart.io

AMCHART is a universal electronic health record (EHR) that's poised to change the way we access patient and provider records. It utilizes blockchain technology to eliminate the current problems with record systems, improving portability and migration of information, as well as transparency and accessibility. Our main objectives are for patients to have full control over their health records, and providers to have increased confidence that blockchain technology can provide to finally make the system whole.

<a href="http://www.youtube.com/watch?v=IrGNT80iMMA" target="_blank"><img src="https://img.youtube.com/vi/IrGNT80iMMA/0.jpg"></a>

### Project Structure

* ServerSetup: Docker containers for running a local Sawtooth cluster
* TransactionProcessor: The Amchart smart contract for saving EHR to the blockchain
* Web: The Amchart web client for submitting transactions
* config: application-wide settings
* common: shared libs for client and server apps

### Is this the entire codebase?

We're publishing components of the Amchart platform as they evolve and mature. We're still building the MVP, so significant sections of code won't immediately be published here. We plan to add code to this public repo as new components are tested and deployed to the test platform.

### Development Platform and Tools

Core Platform dependencies include:

* <a href="https://hyperledger.org/" target="_blank">Hyperledger Sawtooth</a>
* <a href="https://www.ethereum.org/" target="_blank">Ethereum</a>
* <a href="https://www.uport.me/" target="_blank">uPort self-sovereign identity</a>

<div style="display: inline-block">
<img height="80px" src="https://hyperledger.org/wp-content/uploads/2016/09/logo_hl_new.png">
<img height="80px" src="https://avatars1.githubusercontent.com/u/6250754?s=200&v=4">
<img height="80px" src="https://avatars1.githubusercontent.com/u/24941981?s=200&v=4">
</div>
