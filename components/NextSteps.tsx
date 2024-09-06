/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import {
  CircleStackIcon,
  ListBulletIcon,
  ShieldCheckIcon,
  AtSymbolIcon,
  UserCircleIcon,
  PencilSquareIcon,
  BeakerIcon,
  CheckCircleIcon,
  CloudIcon,
  ArrowTopRightOnSquareIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/20/solid";

const timeline = [
  {
    content: "Finish setting up Email + Password configuration",
    description: (
      <div>
        We&apos;ve set up the Email + Password provider for you, however in
        order to really use an email-based factor, you will need to set up SMTP
        to enable sending outgoing emails. Open the EdgeDB UI with the{" "}
        <code>edgedb ui</code> command or through the EdgeDB Cloud Console and
        navigate to the Auth tab. Go to the &quot;SMTP&quot; section and add
        your SMTP credentials. We recommend using a service like{" "}
        <ExternalLink href="https://mailtrap.io/">Mailtrap</ExternalLink> for
        testing, and a service like{" "}
        <ExternalLink href="https://resend.com/">Resend</ExternalLink> for
        production.
      </div>
    ),
    icon: EnvelopeOpenIcon,
  },
  {
    content: "Sign up to the platform",
    description: (
      <div>
        Click the sign up button in the top right corner to create an account.
        We&apos;re using the built-in authentication for this starter but you
        can implement a custom UI later.
        <img
          src="sign-up.png"
          alt="Sign up"
          className="my-4 rounded-md shadow-md shadow-slate-50 w-60"
        />
      </div>
    ),
    icon: UserCircleIcon,
  },
  {
    content: "Extend the EdgeDB schema",
    description: (
      <div>
        Open the <code>schema.esdl</code> file and add your own types and
        fields. You can start by adding a <code>Post</code> type with a{" "}
        <code>title</code> and <code>content</code> field or changing the{" "}
        <code>Item</code> type to include more fields. For example:
        <pre className="mt-2">
          {`type Item {
  # ...

  # Add your new fields here:
  required title: str;
  required content: str;
}`}
        </pre>
      </div>
    ),
    icon: CircleStackIcon,
  },
  {
    content: "Edit the EdgeDB query",
    description: (
      <div>
        Open the <code>app/dashboard/page.tsx</code> file and update the query
        to include your new fields. You can add a new field to the query or
        change the existing fields to include your new data.
        <pre className="mt-2">
          {`\
const itemsQuery = e.select(e.Item, (_item) => ({
  id: true,
  name: true,
  created: true,
  updated: true,
  created_by: {
    name: true,
  },
  // Add your new fields here
}))`}
        </pre>
      </div>
    ),
    icon: ListBulletIcon,
  },
  {
    content: "Add more Auth providers",
    description: (
      <div>
        Open the EdgeDB UI with the <code>edgedb ui</code> command and navigate
        to the Auth tab. Go to the &quot;Providers&quot; section and add a new
        Auth provider by clicking the &quot;Add Provider&quot; button and
        following the instructions.
        <img
          src="add-provider.png"
          alt="Auth providers"
          className="my-4 rounded-md shadow-md shadow-slate-50"
        />
      </div>
    ),
    icon: ShieldCheckIcon,
  },
  {
    content: "Test the reset password flow",
    description: (
      <div>
        Sign out of your account and try to reset your password. Click the
        &quot;Forgot Password&quot; link on the login page and follow the
        instructions to reset your password. You should receive an email with a
        link to reset your password. To test it locally, you can use the Mailpit
        tool. You can find setup instructions in the README.md file.
        <img
          src="reset-password.png"
          alt="Reset password"
          className="my-4 rounded-md shadow-md shadow-slate-50 h-60"
        />
      </div>
    ),
    icon: AtSymbolIcon,
  },
  {
    content: 'Extend the "New Item" form',
    description: (
      <div>
        Open the <code>components/AddItem.tsx</code> file and update the form to
        include your new fields. You can add a new field to the form or change
        the existing fields to include your new data.
        <div className="my-4 rounded-md shadow-md shadow-slate-50 bg-white p-4">
          <img src="new-item.png" alt="Add item form" className="w-96" />
        </div>
      </div>
    ),
    icon: PencilSquareIcon,
  },
  {
    content: "Test access policies",
    description: (
      <p>
        Try deleting an item that you don&apos;t own. You shouldn&apos;t be able
        to delete it. You can test this by creating a new item and then trying
        to delete it with a different account. As a next step you can
        conditionally render the delete button based on the user&apos;s
        permissions.
        <img
          src="delete-item.png"
          alt="Delete item"
          className="my-4 rounded-md shadow-md shadow-slate-50"
        />
      </p>
    ),
    icon: BeakerIcon,
  },
  {
    content: "Modify the EdgeDB Auth UI callback",
    description: (
      <div>
        Open the <code>app/auth.tsx</code> file and update the callback to
        include your new fields. You can add a new field to the callback or
        change the existing fields to include your new data.
      </div>
    ),
    icon: CheckCircleIcon,
  },
  {
    content: "Deploy your app",
    description: (
      <div>
        Once you&apos;re happy with your changes, you can deploy your app to the
        EdgeDB Cloud and Vercel. Follow the deployment instructions in the{" "}
        <ExternalLink href="https://docs.edgedb.com/guides/tutorials/nextjs_app_router#deploying-to-vercel">
          EdgeDB documentation
        </ExternalLink>
        .
      </div>
    ),
    icon: CloudIcon,
  },
].map((step, idx) => ({
  ...step,
  id: idx,
}));

export default function NextSteps() {
  return (
    <div className="">
      <h2 className="text-center text-2xl mb-6 font-bold tracking-tight text-gray-900 sm:text-3xl">
        Next Steps
      </h2>
      <div className="flow-root" suppressHydrationWarning>
        <ul role="list" className="-mb-8">
          {timeline.map((step, eventIdx) => (
            <li key={step.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <span className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white">
                    <step.icon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex flex-col min-w-0 flex-1 pt-2">
                    <p className="text-sm text-gray-700 font-semibold">
                      {step.content}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
      text-primary
      underline
      focus:ring-2
      focus:ring-offset-2
      focus:ring-primary
      focus:ring-offset-white
      focus:outline-none
      focus:ring-opacity-60
      inline-flex
      gap-px
      items-center
      "
    >
      {children}
      <ArrowTopRightOnSquareIcon aria-hidden className="h-3 w-3" />
    </a>
  );
}
