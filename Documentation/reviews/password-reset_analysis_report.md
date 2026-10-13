# Requirements Review: Password Reset

## User story

> As a registered user, I want to reset my password, so that I can access my account if I forget it.

## Issues found

- The story describes the goal but not the password-reset flow or how the user proves ownership of the account.
- “Registered user” does not specify whether the feature applies to every account type or only accounts with a verified recovery method.
- “Reset my password” and “access my account” do not define what happens to existing sessions or whether the user signs in automatically after the reset.
- There are no stated security or abuse-prevention requirements. The flow should avoid exposing whether an account exists and should address unauthorized or repeated reset attempts.
- There are no acceptance criteria, so completion and expected behavior cannot be evaluated consistently.
- There are no contradictions in the story as written.

## Missing information

- Entry point and supported recovery channels (for example, a reset link sent to a verified email address).
- Identity-verification method, reset-link or code lifetime, single-use behavior, and what happens when it expires.
- Password policy, including any length, complexity, reuse, or compromised-password requirements.
- Behavior for unknown accounts, accounts without a verified recovery method, and invalid, expired, or already-used reset links.
- Whether resetting the password revokes existing sessions, and whether the user must sign in with the new password.
- Rate limits, repeated requests, and any notification sent after a password change.
- User-facing confirmation, error messages, accessibility, and localization expectations.

## Questions

1. Which account recovery method or methods should be supported, and must the recovery destination be verified?
2. What should the user experience after requesting a reset, including when the account does not exist?
3. How long should a reset link or code remain valid, and can it be used only once?
4. What password rules should apply, and should the user be prevented from reusing a recent password?
5. Should a successful reset sign the user in, or require a normal sign-in? Should it revoke all existing sessions?
6. What limits should apply to reset requests and verification attempts, and what notification should be sent after a successful reset?

## Suggested test cases

These are candidates for acceptance criteria once the product decisions above are confirmed:

1. A user with a verified recovery method can request a reset and complete the configured verification flow.
2. A valid, unused reset link or code allows the user to set a password that meets the agreed policy.
3. An expired, invalid, or already-used link or code cannot change the password and presents the agreed recovery guidance.
4. Requesting a reset for an unknown account does not reveal whether that account is registered.
5. Repeated requests and verification attempts are handled according to the agreed limits.
6. After a successful reset, the previous password no longer works; session revocation, sign-in behavior, and notifications match the agreed policy.
7. The reset flow can be completed using keyboard navigation and assistive technology, with understandable validation and error messages.
