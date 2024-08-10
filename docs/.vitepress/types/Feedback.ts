import z from 'zod'

export const FeedbackSchema = z.object({
  message: z.string().min(5).max(1000),
  type: z.enum(['bug', 'suggestion', 'appreciation', 'other']),
  page: z.string().min(1).max(20),
  // For heading based feedback
  heading: z.string().min(1).max(30).optional()
})

export interface Option {
  label: string
  value: FeedbackType['type']
}

export const prompts = [
  'Make it count!',
  'Leave some feedback for us!',
  `We're all ears 🐰`,
  'Tell us what is missing in FMHY',
  'Your thoughts matter to us 💡',
  'Feedback is a gift 🎁',
  'What do you think?',
  'We appreciate your support 🙏',
  'Help us make FMHY better 🤝',
  'We need your help 👋',
  'Your feedback is valuable 💯',
  'So... what do you think?',
  "I guess you don't need to say anything 😉"
]

export function getPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export const feedbackOptions: Option[] = [
  {
    label: '💡 I have a suggestion',
    value: 'suggestion'
  },

  { label: '🐛 I want to report a website bug', value: 'bug' },
  {
    label: '👍 I appreciate the work',
    value: 'appreciation'
  },
  { label: '📂 Something else', value: 'other' }
]

export function getFeedbackOption(value: FeedbackType['type']): Option {
  return feedbackOptions.find((option) => option.value === value)
}

export const feedbackModalMessage = {
  bug: [
    "We're sorry to hear that!",
    'Please try to be as specific as possible and provide us with the steps to reproduce the bug.'
  ],
  suggestion: [
    "We're glad you want to share your ideas!",
    'Nix the fluff and just tell us what you think!',
    "We'll be happy to read your thoughts and incorporate them into our content."
  ],
  appreciation: [
    'We appreciate your support!',
    "We're always looking for ways to improve!.",
    'Your feedback is valuable and helps us make FMHY better.'
  ],
  other: [
    "We're always looking for ways to improve!",
    'Your feedback is valuable and helps us make FMHY better.'
  ]
}

export function getRandomFeedbackModalMessage(type: FeedbackType['type']) {
  return feedbackModalMessage[type][
    Math.floor(Math.random() * feedbackModalMessage[type].length)
  ]
}

export type FeedbackType = z.infer<typeof FeedbackSchema>
