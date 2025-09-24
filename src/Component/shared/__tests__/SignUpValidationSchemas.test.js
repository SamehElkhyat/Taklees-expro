import * as Yup from "yup";
import {
  baseValidationFields,
  companyValidationFields,
  mokhalseenValidationFields,
  userValidationFields,
  createValidationSchema,
} from "../SignUpValidationSchemas";

describe("SignUp Validation Schemas", () => {
  describe("Base Validation Fields", () => {
    const baseSchema = Yup.object(baseValidationFields);

    describe("Email Validation", () => {
      test("accepts valid email addresses", async () => {
        const validEmails = [
          "test@example.com",
          "user.name@domain.org",
          "email+tag@subdomain.example.co.uk",
        ];

        for (const email of validEmails) {
          await expect(
            baseSchema.validateAt("Email", { Email: email })
          ).resolves.toBe(email);
        }
      });

      test("rejects invalid email addresses", async () => {
        const invalidEmails = [
          "invalid-email",
          "@domain.com",
          "email@",
          "email..double@domain.com",
          "",
        ];

        for (const email of invalidEmails) {
          await expect(
            baseSchema.validateAt("Email", { Email: email })
          ).rejects.toThrow();
        }
      });

      test("shows correct Arabic error message for invalid email", async () => {
        await expect(
          baseSchema.validateAt("Email", { Email: "invalid" })
        ).rejects.toThrow("بريد إلكتروني غير صالح");
      });

      test("shows correct Arabic error message for required email", async () => {
        await expect(
          baseSchema.validateAt("Email", { Email: "" })
        ).rejects.toThrow("البريد الإلكتروني مطلوب");
      });
    });

    describe("Password Validation", () => {
      test("accepts valid passwords", async () => {
        const validPasswords = [
          "Password123",
          "MySecure1Pass",
          "Complex9Password",
        ];

        for (const password of validPasswords) {
          await expect(
            baseSchema.validateAt("Password", { Password: password })
          ).resolves.toBe(password);
        }
      });

      test("rejects passwords shorter than 8 characters", async () => {
        const shortPasswords = ["Short1", "1234567", "Abc123"];

        for (const password of shortPasswords) {
          await expect(
            baseSchema.validateAt("Password", { Password: password })
          ).rejects.toThrow(
            "يجب أن تحتوي على 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام"
          );
        }
      });

      test("shows correct Arabic error message for required password", async () => {
        await expect(
          baseSchema.validateAt("Password", { Password: "" })
        ).rejects.toThrow("كلمة المرور مطلوبة");
      });
    });

    describe("Full Name Validation", () => {
      test("accepts valid full names", async () => {
        const validNames = [
          "أحمد محمد علي",
          "Ahmed Mohamed Ali",
          "محمد عبدالله الأحمد",
          "John Doe",
        ];

        for (const name of validNames) {
          await expect(
            baseSchema.validateAt("fullName", { fullName: name })
          ).resolves.toBe(name);
        }
      });

      test("rejects empty full name", async () => {
        await expect(
          baseSchema.validateAt("fullName", { fullName: "" })
        ).rejects.toThrow("الاسم الكامل مطلوب");
      });
    });

    describe("Confirm Password Validation", () => {
      test("accepts matching passwords", async () => {
        const formData = {
          Password: "Password123",
          Confirm: "Password123",
        };

        await expect(baseSchema.validate(formData)).resolves.toMatchObject(
          formData
        );
      });

      test("rejects non-matching passwords", async () => {
        const formData = {
          Password: "Password123",
          Confirm: "DifferentPassword123",
        };

        await expect(baseSchema.validate(formData)).rejects.toThrow(
          "كلمات المرور غير متطابقة"
        );
      });

      test("shows required error for empty confirm password", async () => {
        await expect(
          baseSchema.validateAt("Confirm", { Confirm: "" })
        ).rejects.toThrow("تأكيد كلمة المرور مطلوب");
      });
    });

    describe("Identity Validation", () => {
      test("accepts valid identity numbers", async () => {
        const validIdentities = ["1234567890", "0987654321", "1111111111"];

        for (const identity of validIdentities) {
          await expect(
            baseSchema.validateAt("Identity", { Identity: identity })
          ).resolves.toBe(identity);
        }
      });

      test("rejects empty identity", async () => {
        await expect(
          baseSchema.validateAt("Identity", { Identity: "" })
        ).rejects.toThrow("رقم الهويه مطلوب");
      });
    });

    describe("Phone Number Validation", () => {
      test("accepts valid phone numbers", async () => {
        const validPhones = [
          "+966501234567",
          "0501234567",
          "966501234567",
          "501234567",
        ];

        for (const phone of validPhones) {
          await expect(
            baseSchema.validateAt("phoneNumber", { phoneNumber: phone })
          ).resolves.toBe(phone);
        }
      });

      test("rejects empty phone number", async () => {
        await expect(
          baseSchema.validateAt("phoneNumber", { phoneNumber: "" })
        ).rejects.toThrow("رقم الهاتف مطلوب");
      });
    });
  });
  describe("Company Validation Fields", () => {
    const companySchema = Yup.object(companyValidationFields);
    test("includes all base validation fields", () => {
      const baseFieldKeys = Object.keys(baseValidationFields);
      const companyFieldKeys = Object.keys(companyValidationFields);
      baseFieldKeys.forEach((key) => {
        expect(companyFieldKeys).toContain(key);
      });
    });
    test("includes company-specific fields", () => {
      const companyFieldKeys = Object.keys(companyValidationFields);
      expect(companyFieldKeys).toContain("taxRecord");
      expect(companyFieldKeys).toContain("InsuranceNumber");
    });
    describe("Tax Record Validation", () => {
      test("accepts valid tax records", async () => {
        const validTaxRecords = ["1234567890", "TAX123456", "CR-2023-001"];
        for (const taxRecord of validTaxRecords) {
          await expect(
            companySchema.validateAt("taxRecord", { taxRecord })
          ).resolves.toBe(taxRecord);
        }
      });
      test("rejects empty tax record", async () => {
        await expect(
          companySchema.validateAt("taxRecord", { taxRecord: "" })
        ).rejects.toThrow("السجل التجاري مطلوب");
      });
    });
    describe("Insurance Number Validation", () => {
      test("accepts valid insurance numbers", async () => {
        const validInsuranceNumbers = ["1234567890", "INS-123456", "987654321"];
        for (const insuranceNumber of validInsuranceNumbers) {
          await expect(
            companySchema.validateAt("InsuranceNumber", {
              InsuranceNumber: insuranceNumber,
            })
          ).resolves.toBe(insuranceNumber);
        }
      });
      test("rejects empty insurance number", async () => {
        await expect(
          companySchema.validateAt("InsuranceNumber", { InsuranceNumber: "" })
        ).rejects.toThrow("رقم الضريبي مطلوب");
      });
    });
  });
  describe("Mokhalseen Validation Fields", () => {
    const mokhalseenSchema = Yup.object(mokhalseenValidationFields);
    test("includes all base validation fields", () => {
      const baseFieldKeys = Object.keys(baseValidationFields);
      const mokhalseenFieldKeys = Object.keys(mokhalseenValidationFields);
      baseFieldKeys.forEach((key) => {
        expect(mokhalseenFieldKeys).toContain(key);
      });
    });
    test("includes all company fields plus license", () => {
      const mokhalseenFieldKeys = Object.keys(mokhalseenValidationFields);
      expect(mokhalseenFieldKeys).toContain("taxRecord");
      expect(mokhalseenFieldKeys).toContain("InsuranceNumber");
      expect(mokhalseenFieldKeys).toContain("license");
    });
    describe("License Validation", () => {
      test("accepts valid license numbers", async () => {
        const validLicenses = ["LIC-123456", "1234567890", "BROKER-001"];
        for (const license of validLicenses) {
          await expect(
            mokhalseenSchema.validateAt("license", { license })
          ).resolves.toBe(license);
        }
      });
      test("rejects empty license", async () => {
        await expect(
          mokhalseenSchema.validateAt("license", { license: "" })
        ).rejects.toThrow("رقم المفاوض مطلوب");
      });
    });
  });
  describe("User Validation Fields", () => {
    test("user fields are identical to base fields", () => {
      expect(userValidationFields).toEqual(
        expect.objectContaining(baseValidationFields)
      );
    });
    test("user fields only contain base fields", () => {
      const userFieldKeys = Object.keys(userValidationFields);
      const baseFieldKeys = Object.keys(baseValidationFields);

      expect(userFieldKeys.sort()).toEqual(baseFieldKeys.sort());
    });
  });

  describe("createValidationSchema Function", () => {
    test("creates schema with base fields when no additional fields provided", () => {
      const schema = createValidationSchema();
      const schemaFields = schema.describe().fields;

      Object.keys(baseValidationFields).forEach((key) => {
        expect(schemaFields).toHaveProperty(key);
      });
    });

    test("creates schema with additional fields merged", () => {
      const additionalFields = {
        customField: Yup.string().required("Custom field required"),
      };

      const schema = createValidationSchema(additionalFields);
      const schemaFields = schema.describe().fields;

      // Should have base fields
      Object.keys(baseValidationFields).forEach((key) => {
        expect(schemaFields).toHaveProperty(key);
      });

      // Should have additional fields
      expect(schemaFields).toHaveProperty("customField");
    });

    test("additional fields override base fields when keys match", () => {
      const additionalFields = {
        Email: Yup.string().required("Custom email validation"),
      };

      const schema = createValidationSchema(additionalFields);

      // Test that the custom validation is used
      expect(
        schema.validateAt("Email", { Email: "invalid-email" })
      ).rejects.toThrow("Custom email validation");
    });

    test("handles empty additional fields object", () => {
      const schema = createValidationSchema({});
      const schemaFields = schema.describe().fields;

      Object.keys(baseValidationFields).forEach((key) => {
        expect(schemaFields).toHaveProperty(key);
      });
    });

    test("returns a valid Yup schema object", () => {
      const schema = createValidationSchema();

      expect(schema).toBeInstanceOf(Yup.ObjectSchema);
      expect(typeof schema.validate).toBe("function");
      expect(typeof schema.validateAt).toBe("function");
    });
  });

  describe("Integration Tests", () => {
    test("validates complete user signup form", async () => {
      const schema = createValidationSchema(userValidationFields);
      const validUserData = {
        Email: "user@example.com",
        Password: "Password123",
        fullName: "أحمد محمد",
        Confirm: "Password123",
        Identity: "1234567890",
        phoneNumber: "0501234567",
      };

      await expect(schema.validate(validUserData)).resolves.toEqual(
        validUserData
      );
    });

    test("validates complete company signup form", async () => {
      const schema = createValidationSchema(companyValidationFields);
      const validCompanyData = {
        Email: "company@example.com",
        Password: "Password123",
        fullName: "شركة التخليص التجاري",
        Confirm: "Password123",
        Identity: "1234567890",
        phoneNumber: "0501234567",
        taxRecord: "CR-2023-001",
        InsuranceNumber: "TAX-123456",
      };

      await expect(schema.validate(validCompanyData)).resolves.toEqual(
        validCompanyData
      );
    });

    test("validates complete mokhalseen signup form", async () => {
      const schema = createValidationSchema(mokhalseenValidationFields);
      const validMokhalseenData = {
        Email: "broker@example.com",
        Password: "Password123",
        fullName: "مكتب التخليص المتخصص",
        Confirm: "Password123",
        Identity: "1234567890",
        phoneNumber: "0501234567",
        taxRecord: "CR-2023-002",
        InsuranceNumber: "TAX-789012",
        license: "BROKER-001",
      };

      await expect(schema.validate(validMokhalseenData)).resolves.toEqual(
        validMokhalseenData
      );
    });

    test("rejects incomplete form data", async () => {
      const schema = createValidationSchema(companyValidationFields);
      const incompleteData = {
        Email: "company@example.com",
        Password: "Password123",
        // Missing required fields
      };

      await expect(schema.validate(incompleteData)).rejects.toThrow();
    });
  });

  describe("Error Message Localization", () => {
    test("all error messages are in Arabic", async () => {
      const schema = createValidationSchema(mokhalseenValidationFields);
      const invalidData = {
        Email: "invalid-email",
        Password: "123", // Too short
        fullName: "",
        Confirm: "different",
        Identity: "",
        phoneNumber: "",
        taxRecord: "",
        InsuranceNumber: "",
        license: "",
      };

      try {
        await schema.validate(invalidData, { abortEarly: false });
      } catch (error) {
        error.errors.forEach((errorMessage) => {
          // Check that error messages contain Arabic characters or expected English technical terms
          expect(
            errorMessage.includes("مطلوب") ||
              errorMessage.includes("غير صالح") ||
              errorMessage.includes("أحرف") ||
              errorMessage.includes("متطابقة")
          ).toBe(true);
        });
      }
    });
  });
});
