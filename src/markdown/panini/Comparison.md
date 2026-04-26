Take the first layer from popular CNN and analyze distribution of kernels. All possible kernels in use? Is there a repetition? Any effect if some kernels are missing? 

Take that layer and do not train it in new models. It’s fixed.



Take mnist dataset and run classification on simple ann 
Then on CNN
Then Transformer - next sequence is another image from the dataset - this network will fix the inputs. Or next sequence is text representation of this digit - just pure classification 
Then GAN
Then SOM

Say that all of them are based on key ideas
From kohonnen self organized maps - stdp version of training but for not spiking neurons
From grossberg adaptive resonance theory that declares the refinement of inputs implemented by two opposite networks - generator and discriminator. 
From Minski back propagation
From Hebb STDP
