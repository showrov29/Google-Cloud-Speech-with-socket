const API_URL =
	"https://api.elevenlabs.io/v1/text-to-speech/bIHbv24MWmeRgasZH58o";

// Function to convert text to speech
export async function textToSpeech(text) {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"xi-api-key": "",
			},
			body: JSON.stringify({
				text: text,
				voice_settings: {
					stability: 0.5, // Adjust stability settings as needed
					similarity_boost: 0.5,
				},
			}),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		// Get the audio data as a Blob and create an audio URL
		const audioBlob = await response.blob();

		const audioUrl = URL.createObjectURL(audioBlob);
		const audioPlayer = document.getElementById("audio");
		audioPlayer.src = audioUrl;

		// // Context for ElevenLabs audio (will not be recorded)
		// const elevenLabsContext = new AudioContext();
		// const elevenLabsAudio =
		// 	elevenLabsContext.createMediaElementSource(audioPlayer);
		// elevenLabsAudio.connect(elevenLabsContext.destination); // Play locally only

		// // Create a source node from the audio player
		// const sourceNode = audioContext.createMediaElementSource(audioPlayer);

		// // Connect the source node to the audio context destination (the speakers)
		// const mediaRecorder = new MediaRecorder(destination.stream);

		audioPlayer.play();

		console.log("Playing the generated audio...");
	} catch (error) {
		console.error("Error converting text to speech:", error);
	}
}
