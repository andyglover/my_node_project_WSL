### README.md

# Markdown Note Submission App

This project is a Node.js application that allows users to submit Markdown content through a web form. The content is saved locally with a timestamped filename. The application is built with Express.js and provides multiple timestamp formats for file naming.

## Features

- Submit Markdown content via a web form.
- Save submitted content with a timestamped filename.
- Multiple timestamp formats available (ISO 8601, Compact, Human-Readable, Unix, Custom).

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

1. **Start the server**:

   ```bash
   node server.js
   ```

2. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000`.

3. **Submit Markdown content**:
   - Enter your Markdown content in the form.
   - Click the "Submit" button.
   - The submitted content will be saved in the `notes` directory with a timestamped filename.

## Configuration

### Timestamp Formats

You can change the timestamp format by modifying the `timestampFormat` variable in `server.js`. The available options are:

- `iso`: ISO 8601 Format (e.g., `2023-05-20T15-20-30-000Z`)
- `compact`: Compact Date-Time Format (e.g., `20230520-152030`)
- `humanReadable`: Human-Readable Format (e.g., `2023-May-20_15-20-30`)
- `unix`: Unix Timestamp (e.g., `1684615230`)
- `custom`: Custom Format (e.g., `2023_05_20-15_20_30`)

To change the format, open `server.js` and set the `timestampFormat` variable to your desired format:

```javascript
// Change this to your preferred format: iso, compact, humanReadable, unix, custom
const timestampFormat = "humanReadable";
```

### Time Zone Awareness

- **ISO 8601 Format**: Time zone aware (UTC).
- **Compact Date-Time and Custom Formats**: Local system time without explicit time zone information.
- **Human-Readable Format**: Local system time (depends on locale settings).
- **Unix Timestamp**: Based on UTC but does not explicitly include time zone information.

## License

This project is licensed under the MIT License.
