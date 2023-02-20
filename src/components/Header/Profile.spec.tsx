/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import { Profile } from './Profile'

describe("Profile component", () => {
  it("renders correctly if showProfileData is true", async () => {
    render(<Profile showProfileData={true}/>);

    await waitFor(() => expect(screen.getByRole("user_data")).toBeInTheDocument());
  });
  
  it("renders correctly if showProfileData is false", async () => {
    render(<Profile showProfileData={false}/>);

    expect(screen.queryByRole("user_data")).not.toBeInTheDocument();
  });
})