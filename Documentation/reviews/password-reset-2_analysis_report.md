# Password Reset — Requirements Analysis

## Issues found

- The story states the user goal but not the password-reset flow or its expected outcomes.
- “Registered user” and “reset my password” are underspecified: the account identifier, recovery channel, and proof-of-ownership mechanism are not defined.
- There are no acceptance criteria, so the requirement is not sufficiently testable as written.
- No explicit contradiction is apparent from the story alone.

## Missing information

- Which identifier starts recovery (email, username, or another identifier)?
- How does the user prove account ownership (for example, a time-limited link or one-time code), and through which verified channel is it sent?
- What password policy applies to the new password?
- What should happen for unknown accounts, expired or already-used recovery credentials, and rate-limited requests?
- Should a successful reset invalidate existing sessions or other outstanding recovery credentials?
- What confirmation should be shown after a request and after a successful reset?

## Questions

1. What account identifier and verified recovery channel should the reset flow use?
2. Should recovery use a link or a one-time code, and what are its expiry and reuse rules?
3. What are the new-password requirements, and should the user’s existing sessions be invalidated after reset?
4. Should the request response be indistinguishable for registered and unregistered accounts to avoid account enumeration?
5. What should the user see when a recovery credential is invalid, expired, or already used?

## Suggested test cases

- Submit a reset request for a registered account and verify the defined generic confirmation is displayed and the recovery message is sent through the verified channel.
- Submit a reset request for an unregistered account and verify the same public confirmation is displayed.
- Complete a valid recovery flow and verify the new password can sign in while the old password cannot.
- Reject a new password that violates the agreed password policy.
- Reject an expired or previously used recovery link/code; verify it cannot change the password.
- Verify behavior for malformed identifiers, repeated requests, and rate limits according to the agreed requirements.
- If session invalidation is required, verify existing sessions are ended after the password changes.

## Tagged test-file relevance

The tagged [test.spec.js](../../tests/test.spec.js) covers adding a TodoMVC item. It does not exercise password recovery and provides no coverage for this story.
