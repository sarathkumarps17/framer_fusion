
import { validateSignUpRequest } from "@/helpers/apiRequestValidation";
import { ZodError } from "zod";


describe("validateSignUpRequest", () => {
  const mockSignUpSchema = {
    safeParse: jest.fn(),
  };
  const mockSignUpResponseSchema = {
    safeParse: jest.fn(),
  };

  beforeAll(() => {
    jest.mock("@/types/user", () => ({
      SignUpSchema: mockSignUpSchema,
      SignUpResponseSchema: mockSignUpResponseSchema,
    }));
  });

  beforeEach(() => {
    mockSignUpSchema.safeParse.mockReset();
  });

  test("should return validated data if validation succeeds", () => {
    const mockValidatedData = { name: "Test User", email: "test@example.com", password: "abc@D123!^", passwordVerify: "abc@D123!^" };
    mockSignUpSchema.safeParse.mockReturnValueOnce({ success: true, data: mockValidatedData });
    const signUpData = { name: "Test User", email: "test@example.com", password: "abc@D123!^", passwordVerify: "abc@D123!^" };
    const result = validateSignUpRequest(signUpData);
    expect(result).toEqual(mockValidatedData);

  });

  test("should return ZodError if validation fails", () => {
    const mockError = new ZodError([]);
    mockSignUpSchema.safeParse.mockReturnValueOnce({ success: false, error: mockError });
    const signUpData = { name: "Invalid User", email: "invalid-email", password: "short", passwordVerify: "short" };
    const result = validateSignUpRequest(signUpData);
    expect(result).toBeInstanceOf(ZodError);

  });
});

