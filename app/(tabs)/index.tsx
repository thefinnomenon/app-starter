import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTheme } from '@/lib/contexts/ThemeContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, ChevronDown, Moon, Sun } from 'lucide-react-native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { toast } from 'sonner-native'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: 'Must be at least 18 years old',
  }),
  bio: z
    .string()
    .refine((val) => val === '' || val.length >= 10, {
      message: 'Bio must be at least 10 characters if provided',
    })
    .optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

type FormData = z.infer<typeof formSchema>

export default function HomeScreen() {
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [progress, setProgress] = useState(60)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [toggleValue, setToggleValue] = useState(false)
  const [tabValue, setTabValue] = useState('tab1')
  const [toggleGroupValue, setToggleGroupValue] = useState('center')
  const [selectValue, setSelectValue] = useState<
    { value: string; label: string } | undefined
  >()
  const { theme, setTheme, colorScheme } = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      age: '',
      bio: '',
      acceptTerms: false,
    },
  })

  const onSubmit = (data: FormData) => {
    toast.success('Form submitted successfully!')
    console.log(data)
    reset()
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Navigation Bar */}
      <View className="bg-card border-b border-border px-6 py-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-foreground">App Starter</Text>
        <Button
          variant="outline"
          size="sm"
          onPress={() => {
            if (theme === 'light') setTheme('dark')
            else if (theme === 'dark') setTheme('system')
            else setTheme('light')
          }}
        >
          {colorScheme === 'dark' ? (
            <Moon size={16} className="text-foreground" />
          ) : (
            <Sun size={16} className="text-foreground" />
          )}
          <Text className="ml-2 text-foreground">
            {theme === 'system' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}
          </Text>
        </Button>
      </View>

      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          <View>
            <Text className="text-3xl font-bold mb-2">
              React Native Reusables
            </Text>
            <Text className="text-muted-foreground">
              All components showcase
            </Text>
          </View>

          <Separator />

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Different button variants</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Button>
                <Text>Default Button</Text>
              </Button>
              <Button variant="secondary">
                <Text>Secondary Button</Text>
              </Button>
              <Button variant="destructive">
                <Text>Destructive Button</Text>
              </Button>
              <Button variant="outline">
                <Text>Outline Button</Text>
              </Button>
              <Button variant="ghost">
                <Text>Ghost Button</Text>
              </Button>
              <Button variant="link">
                <Text>Link Button</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex-row gap-2 flex-wrap">
              <Badge>
                <Text>Default</Text>
              </Badge>
              <Badge variant="secondary">
                <Text>Secondary</Text>
              </Badge>
              <Badge variant="destructive">
                <Text>Destructive</Text>
              </Badge>
              <Badge variant="outline">
                <Text>Outline</Text>
              </Badge>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex-row gap-4">
              <Avatar alt="User Avatar">
                <AvatarImage
                  source={{ uri: 'https://github.com/shadcn.png' }}
                />
                <AvatarFallback>
                  <Text>CN</Text>
                </AvatarFallback>
              </Avatar>
              <Avatar alt="User Avatar 2">
                <AvatarFallback>
                  <Text>AB</Text>
                </AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>

          {/* Input & Label */}
          <Card>
            <CardHeader>
              <CardTitle>Input & Label</CardTitle>
            </CardHeader>
            <CardContent className="gap-2">
              <Label nativeID="email">Email</Label>
              <Input
                placeholder="Enter your email"
                value={inputValue}
                onChangeText={setInputValue}
                aria-labelledby="email"
              />
            </CardContent>
          </Card>

          {/* Form Validation */}
          <Card>
            <CardHeader>
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>
                React Hook Form with Zod validation
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="gap-2">
                <Label nativeID="username">Username</Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Enter username"
                      value={value}
                      onChangeText={onChange}
                      aria-labelledby="username"
                    />
                  )}
                />
                {errors.username && (
                  <Text className="text-destructive text-sm">
                    {errors.username.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
                <Label nativeID="form-email">Email</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Enter email"
                      value={value}
                      onChangeText={onChange}
                      aria-labelledby="form-email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-destructive text-sm">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
                <Label nativeID="age">Age</Label>
                <Controller
                  control={control}
                  name="age"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Enter age"
                      value={value}
                      onChangeText={onChange}
                      aria-labelledby="age"
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.age && (
                  <Text className="text-destructive text-sm">
                    {errors.age.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
                <Label nativeID="bio">Bio (optional)</Label>
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      placeholder="Tell us about yourself"
                      value={value}
                      onChangeText={onChange}
                      aria-labelledby="bio"
                      numberOfLines={3}
                    />
                  )}
                />
                {errors.bio && (
                  <Text className="text-destructive text-sm">
                    {errors.bio.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <Controller
                    control={control}
                    name="acceptTerms"
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value}
                        onCheckedChange={onChange}
                        aria-labelledby="accept-terms"
                      />
                    )}
                  />
                  <Label nativeID="accept-terms">
                    Accept terms and conditions
                  </Label>
                </View>
                {errors.acceptTerms && (
                  <Text className="text-destructive text-sm">
                    {errors.acceptTerms.message}
                  </Text>
                )}
              </View>

              <Button onPress={handleSubmit(onSubmit)}>
                <Text>Submit Form</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your message"
                value={textareaValue}
                onChangeText={setTextareaValue}
                numberOfLines={4}
              />
            </CardContent>
          </Card>

          {/* Switch */}
          <Card>
            <CardHeader>
              <CardTitle>Switch</CardTitle>
            </CardHeader>
            <CardContent className="flex-row items-center gap-4">
              <Switch checked={switchValue} onCheckedChange={setSwitchValue} />
              <Text>Switch is {switchValue ? 'ON' : 'OFF'}</Text>
            </CardContent>
          </Card>

          {/* Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
            </CardHeader>
            <CardContent className="flex-row items-center gap-4">
              <Checkbox
                checked={checkboxValue}
                onCheckedChange={setCheckboxValue}
              />
              <Text>Accept terms and conditions</Text>
            </CardContent>
          </Card>

          {/* Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <View className="flex-row items-center gap-2">
                  <RadioGroupItem value="option1" aria-labelledby="option1" />
                  <Label nativeID="option1">Option 1</Label>
                </View>
                <View className="flex-row items-center gap-2">
                  <RadioGroupItem value="option2" aria-labelledby="option2" />
                  <Label nativeID="option2">Option 2</Label>
                </View>
                <View className="flex-row items-center gap-2">
                  <RadioGroupItem value="option3" aria-labelledby="option3" />
                  <Label nativeID="option3">Option 3</Label>
                </View>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <Progress value={progress} className="w-full" />
              <View className="flex-row gap-2">
                <Button
                  onPress={() => setProgress(Math.max(0, progress - 10))}
                  size="sm"
                >
                  <Text>-10%</Text>
                </Button>
                <Button
                  onPress={() => setProgress(Math.min(100, progress + 10))}
                  size="sm"
                >
                  <Text>+10%</Text>
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* Alert */}
          <Alert icon={AlertCircle}>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
              This is an alert description that provides important information.
            </AlertDescription>
          </Alert>

          {/* Toast/Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications</CardTitle>
              <CardDescription>Show toast messages</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Button onPress={() => toast('This is a default toast')}>
                <Text>Show Toast</Text>
              </Button>
              <Button
                variant="secondary"
                onPress={() =>
                  toast.success('Success! Your action was completed.')
                }
              >
                <Text>Success Toast</Text>
              </Button>
              <Button
                variant="destructive"
                onPress={() => toast.error('Error! Something went wrong.')}
              >
                <Text>Error Toast</Text>
              </Button>
              <Button
                variant="outline"
                onPress={() =>
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: 'Loading...',
                      success: () => 'Data loaded successfully!',
                      error: 'Failed to load data',
                    }
                  )
                }
              >
                <Text>Promise Toast</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
            </CardHeader>
            <CardContent className="gap-2">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-3/4 h-12" />
              <Skeleton className="w-1/2 h-12" />
            </CardContent>
          </Card>

          {/* Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle</CardTitle>
            </CardHeader>
            <CardContent>
              <Toggle pressed={toggleValue} onPressedChange={setToggleValue}>
                <Text>{toggleValue ? 'Pressed' : 'Not Pressed'}</Text>
              </Toggle>
            </CardContent>
          </Card>

          {/* Toggle Group */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle Group</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup
                type="single"
                value={toggleGroupValue}
                onValueChange={(val) => val && setToggleGroupValue(val)}
              >
                <ToggleGroupItem value="left" aria-label="Left align">
                  <Text>Left</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center align">
                  <Text>Center</Text>
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right align">
                  <Text>Right</Text>
                </ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={tabValue} onValueChange={setTabValue}>
                <TabsList>
                  <TabsTrigger value="tab1">
                    <Text>Tab 1</Text>
                  </TabsTrigger>
                  <TabsTrigger value="tab2">
                    <Text>Tab 2</Text>
                  </TabsTrigger>
                  <TabsTrigger value="tab3">
                    <Text>Tab 3</Text>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <Text className="p-4">Content for Tab 1</Text>
                </TabsContent>
                <TabsContent value="tab2">
                  <Text className="p-4">Content for Tab 2</Text>
                </TabsContent>
                <TabsContent value="tab3">
                  <Text className="p-4">Content for Tab 3</Text>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Text>Is it accessible?</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <Text>Is it styled?</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>
                      Yes. It comes with default styles that match the other
                      components.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <Text>Is it animated?</Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text>
                      Yes. It&apos;s animated by default, but you can disable it
                      if you prefer.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Select from dropdown options</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem label="Apple" value="apple" />
                  <SelectItem label="Banana" value="banana" />
                  <SelectItem label="Orange" value="orange" />
                  <SelectItem label="Mango" value="mango" />
                </SelectContent>
              </Select>
              {selectValue && (
                <Text className="mt-2 text-muted-foreground">
                  Selected: {selectValue.label}
                </Text>
              )}
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Modal dialog example</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Text>Open Dialog</Text>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog description. You can put any content
                      here.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>
                      <Text>Confirm</Text>
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Alert Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Dialog</CardTitle>
              <CardDescription>Alert dialog with actions</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Text>Delete Account</Text>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <Text>Cancel</Text>
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onPress={() => toast.success('Account deleted')}
                    >
                      <Text>Continue</Text>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Dropdown Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu</CardTitle>
              <CardDescription>Dropdown menu with options</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Text>Open Menu</Text>
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onPress={() => toast('Profile clicked')}>
                    <Text>Profile</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem onPress={() => toast('Settings clicked')}>
                    <Text>Settings</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem onPress={() => toast('Team clicked')}>
                    <Text>Team</Text>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onPress={() => toast('Logged out')}>
                    <Text>Logout</Text>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Context Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Context Menu</CardTitle>
              <CardDescription>Long press to open context menu</CardDescription>
            </CardHeader>
            <CardContent>
              <ContextMenu>
                <ContextMenuTrigger>
                  <View className="border border-border rounded-lg p-6 items-center justify-center bg-muted">
                    <Text className="text-muted-foreground">
                      Long press here
                    </Text>
                  </View>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onPress={() => toast('Copy clicked')}>
                    <Text>Copy</Text>
                  </ContextMenuItem>
                  <ContextMenuItem onPress={() => toast('Cut clicked')}>
                    <Text>Cut</Text>
                  </ContextMenuItem>
                  <ContextMenuItem onPress={() => toast('Paste clicked')}>
                    <Text>Paste</Text>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>

          {/* Tooltip */}
          <Card>
            <CardHeader>
              <CardTitle>Tooltip</CardTitle>
              <CardDescription>Hover or long press for tooltip</CardDescription>
            </CardHeader>
            <CardContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Text>Hover me</Text>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <Text>This is a helpful tooltip!</Text>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Card Example */}
          <Card>
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>This is a card description</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>
                Card content goes here. You can put any content inside a card.
              </Text>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Text>Card Action</Text>
              </Button>
            </CardFooter>
          </Card>

          <View className="pb-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
